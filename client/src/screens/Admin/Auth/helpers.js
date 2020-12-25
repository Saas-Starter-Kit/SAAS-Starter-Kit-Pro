import { useContext } from 'react';
import apiContext from '../../../utils/apiContext';
import jwt_decode from 'jwt-decode';
import { navigate } from 'gatsby';
import * as Yup from 'yup';
import axios from '../../../services/axios';

//valid format for setting an email and password
export const ValidSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(3, 'Password must be at least 3 Characters')
    .max(50, 'Password Too Long')
    .required('Password Required')
});

//Save user information to our own db and and create stripe customer
export const Authentication = async (authRes, LogIn, isLogin, firebase, fetchFailure) => {
  console.log(authRes);

  //Get Auth id token from Firebase
  let token = await firebase
    .auth()
    .currentUser.getIdToken()
    .catch((err) => {
      fetchFailure(err);
    });

  //server firebase authentication, returns jwt token
  let authServerRes;
  let username = authRes.user.displayName ? authRes.user.displayName : authRes.user.email;
  let email = authRes.user.email;

  if (isLogin) {
    let data = { email, token };

    authServerRes = await axios.post(`/auth/login`, data).catch((err) => {
      fetchFailure(err);
    });
  } else {
    let data = { email, username, token };

    authServerRes = await axios.post(`/auth/signup`, data).catch((err) => {
      fetchFailure(err);
    });

    console.log(authServerRes);
  }

  let userId;
  //decode jwt token recieved from server
  if (jwt_decode(authServerRes.data.token)) {
    userId = jwt_decode(authServerRes.data.token).user;
  } else {
    //figure out
    //setLoading(false);
    //setErrMessage('Authentication Failed, please contact Support');
    throw new Error('JWT decode failed or JWT invalid');
  }

  let stripeServerRes;
  console.log(authServerRes);
  if (!isLogin) {
    let data = { userId, email };
    //create stripe customer based on our own server user id
    stripeServerRes = await axios.post('/stripe/create-customer', data).catch((err) => {
      fetchFailure(err);
    });
  } else {
    //for login, stripe customer key is returned from our own db during server auth
    stripeServerRes = authServerRes;
  }

  console.log(stripeServerRes);

  ////save user data to React context
  LogintoContext(userId, authRes, stripeServerRes, LogIn);
};

//Save user Info to Context
export const LogintoContext = async (user_id, authRes, stripeKey, LogIn) => {
  console.log(authRes);
  console.log(stripeKey);

  let email = authRes.user.email;
  let username = authRes.user.displayName ? authRes.user.displayName : authRes.user.email;
  let id = user_id;
  let photo = authRes.user.photoURL;
  let provider = authRes.user.providerData[0].providerId;
  let stripeCustomerKey = stripeKey.data.stripe_customer_id;

  console.log(stripeCustomerKey);

  let user = {
    email,
    username,
    id,
    photo,
    provider,
    stripeCustomerKey
  };

  await LogIn(user);
  setTimeout(() => navigate('/app'), 200);
};
