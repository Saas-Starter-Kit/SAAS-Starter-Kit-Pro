import { useContext } from 'react';
import apiContext from '../../../utils/apiContext';
import jwt_decode from 'jwt-decode';
import { navigate } from 'gatsby';
import * as Yup from 'yup';
import axios from '../../../services/axios';

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

export const LoginAuth = async (authRes, LogIn, firebase, fetchFailure) => {
  console.log(authRes);

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

  console.log(userId);

  LogintoContext(userId, authRes, authServerRes, LogIn);
};

export const SignupAuth = async (authRes, LogIn, firebase, fetchFailure, name) => {
  console.log(authRes);

  // If user signed up with email, then set their display name
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

  //Set authRes to current user to account for
  //updating username with email signup
  authRes = { user: await firebase.auth().currentUser };

  //Get Auth id token from Firebase
  let token = await firebase
    .auth()
    .currentUser.getIdToken()
    .catch((err) => {
      fetchFailure(err);
    });

  //server firebase authentication, returns jwt token
  let username = authRes.user.displayName;
  let email = authRes.user.email;

  let authData = { email, username, token };
  let authServerRes = await axios.post(`/auth/signup`, authData).catch((err) => {
    fetchFailure(err);
  });

  console.log(authServerRes);

  let validToken = isValidToken(authServerRes.data.token, fetchFailure);
  let userId = validToken.user;

  let stripeApiData = { userId, email };
  //create stripe customer based on our own server user id
  let stripeServerRes = await axios.post('/stripe/create-customer', stripeApiData).catch((err) => {
    fetchFailure(err);
  });

  let isSignup = true;

  //Send Verification Email
  //  const url = data.site.siteMetadata.siteUrl;
  const url = 'http://localhost:8000';
  //  const email = authState.user.email;
  const email2 = 'iqbal125@yahoo.com';

  const actionCodeSettings = {
    url: `${url}/?email=${email2}`
  };

  await firebase
    .auth()
    .currentUser.sendEmailVerification(actionCodeSettings)
    .then(function () {
      // Verification email sent.
      console.log('llllll');
    })
    .catch(function (error) {
      // Error occurred. Inspect error.code.
    });

  LogintoContext(userId, authRes, stripeServerRes, LogIn, isSignup);
};

//Save user Info to Context
export const LogintoContext = async (user_id, authRes, stripeKey, LogIn, isSignup) => {
  console.log(authRes);
  //console.log(stripeKey);

  let email = authRes.user.email;
  let username = authRes.user.displayName;
  let id = user_id;
  let photo = authRes.user.photoURL;
  let provider = authRes.user.providerData[0].providerId;
  let stripeCustomerKey = stripeKey.data.stripe_customer_id;

  let user = {
    email,
    username,
    id,
    photo,
    provider,
    stripeCustomerKey
  };

  console.log(user);

  await LogIn(user);
  if (isSignup) {
    //navigate to email confirm
    navigate('/auth/emailconfirm');
  } else {
    navigate('/user/profile');
  }
};

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
