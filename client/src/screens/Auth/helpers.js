import jwt_decode from 'jwt-decode';
import { navigate } from 'gatsby';
import * as Yup from 'yup';
import axios from '../../services/axios';

export const LoginAuth = async (
  authRes,
  LogIn,
  firebase,
  fetchFailure,
  isPaymentFlow,
  isInviteFlow,
  app_id
) => {
  console.log(isInviteFlow, app_id);
  //Get Auth id token from Firebase
  let token = await firebase
    .auth()
    .currentUser.getIdToken()
    .catch((err) => {
      fetchFailure(err);
    });

  //server firebase authentication, returns jwt token
  let email = authRes.user.email;
  let data = { email, token };
  let authServerRes = await axios.post(`/auth/login`, data).catch((err) => {
    fetchFailure(err);
  });

  let validToken = isValidToken(authServerRes.data.token, fetchFailure);
  let userId = validToken.user;

  LogintoContext(userId, authRes, authServerRes, LogIn, isPaymentFlow, isInviteFlow, app_id);
};

//Save user Info to Context
export const LogintoContext = async (
  user_id,
  authRes,
  authServerRes,
  LogIn,
  isPaymentFlow,
  isInviteFlow,
  app_id
) => {
  let email = authRes.user.email;
  let username = authRes.user.displayName;
  let id = user_id;
  let photo = authRes.user.photoURL;
  let provider = authRes.user.providerData[0].providerId;
  let stripeCustomerKey = authServerRes.data.stripe_customer_id;
  let subscription_id = authServerRes.data.subscription_id;

  let user = {
    email,
    username,
    id,
    photo,
    provider,
    stripeCustomerKey,
    subscription_id
  };

  console.log(isInviteFlow);

  await LogIn(user);

  //navigate to correct route based on flow
  if (isPaymentFlow && !subscription_id) {
    navigate('/purchase/plan');
  } else if (isPaymentFlow && subscription_id) {
    navigate('/purchase/subcriptionexists');
  } else if (isInviteFlow) {
    navigate(`/user/confirmedinvite/${app_id}`);
  } else {
    navigate('/user/dashboard');
  }
};

export const SignupAuth = async (
  authRes,
  firebase,
  fetchFailure,
  name,
  domainUrl,
  isInviteFlow,
  app_id
) => {
  // If user signed up with email, then set their display name
  const isEmailSignup = authRes.additionalUserInfo.providerId === 'password';
  console.log(isEmailSignup);
  if (isEmailSignup && name) {
    let curUser = await firebase.auth().currentUser;

    await curUser
      .updateProfile({
        displayName: name
      })
      .catch((err) => {
        fetchFailure(err);
      });
  }

  //Get Auth id token from Firebase
  let token = await firebase
    .auth()
    .currentUser.getIdToken()
    .catch((err) => {
      fetchFailure(err);
    });

  //server firebase authentication, returns jwt token
  let username = authRes.user.displayName ? authRes.user.displayName : name;
  let email = authRes.user.email;

  let authData = { email, username, token };
  let authServerRes = await axios.post(`/auth/signup`, authData).catch((err) => {
    fetchFailure(err);
  });

  //extract user id from jwt token
  let validToken = isValidToken(authServerRes.data.token, fetchFailure);
  let userId = validToken.user;

  // the url the user is redirected to after email verify
  const baseUrl = `${domainUrl}/auth/confirmedemail`;
  let provider = authRes.user.providerData[0].providerId;

  //save user info to url for later extraction
  const redirectUrl = `${baseUrl}/?email=${email}&userId=${userId}&username=${username}&provider=${provider}&isInviteFlow=${isInviteFlow}&app_id=${app_id}`;
  let verifyEmailData = { email, redirectUrl, username };

  //Send Verification Email
  await axios.post('/auth/verify-email', verifyEmailData).catch((err) => fetchFailure(err));

  navigate('/auth/emailconfirm');
};

//valid format for setting an email, username and password
export const ValidSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email Required'),
  username: Yup.string()
    .min(3, 'Name must be at least 3 Characters')
    .max(50, 'Name Too Long')
    .required('Name Required'),
  password: Yup.string()
    .min(3, 'Password must be at least 3 Characters')
    .max(50, 'Password Too Long')
    .required('Password Required')
});

const isValidToken = (token, fetchFailure) => {
  //decode jwt token recieved from server
  let validToken;
  try {
    validToken = jwt_decode(token);
  } catch {
    console.log('JWT token decode failed');
    let error = {
      type: 'Authentication Failed',
      message: 'Authentication Failed, please try again or contact Support'
    };

    fetchFailure(error);
  }

  return validToken;
};
