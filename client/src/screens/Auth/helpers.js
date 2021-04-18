import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import axios from '../../services/axios';
import { setAnalyticsUserId, sendEventToAnalytics } from '../../services/analytics';

export const LoginAuth = async (
  authRes,
  LogIn,
  firebase,
  fetchFailure,
  isInviteFlow,
  invite_key
) => {
  const router = useRouter();
  //Get Auth id token from Firebase
  let token = await firebase
    .auth()
    .currentUser.getIdToken()
    .catch((err) => {
      fetchFailure(err);
    });

  //server authentication, returns jwt token
  let email = authRes.user.email;
  let data = { email, token };
  let authServerRes = await axios.post(`/auth/login`, data).catch((err) => {
    fetchFailure(err);
  });

  let validToken = isValidToken(authServerRes.data.token, fetchFailure);

  let id = validToken.user;
  let username = authRes.user.displayName;
  let photo = authRes.user.photoURL;
  let provider = authRes.user.providerData[0].providerId;
  let jwt_token = authServerRes.data.token;

  let user = {
    id,
    email,
    username,
    photo,
    provider,
    jwt_token
  };

  sendEventToAnalytics('login', { method: 'Email' });
  setAnalyticsUserId(id);

  //save user info to React context
  await LogIn(user);

  //navigate to correct route based on flow
  if (isInviteFlow) {
    router.push(`/user/confirmedinvite/${invite_key}`);
  } else {
    router.push('/user/dashboard');
  }
};

export const SignupAuth = async (
  authRes,
  firebase,
  fetchFailure,
  name,
  domainUrl,
  isInviteFlow,
  invite_key
) => {
  const router = useRouter();
  // If user signed up with email, then set their display username
  const isEmailSignup = authRes.additionalUserInfo.providerId === 'password';
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

  // the url the user is redirected to after email verify
  const confirmEmailUrl = `${domainUrl}/auth/confirmedemail`;

  let authData = { email, username, token, confirmEmailUrl, isInviteFlow, invite_key };

  await axios.post(`/auth/signup`, authData).catch((err) => {
    fetchFailure(err);
  });

  router.push('/auth/emailconfirm');
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
