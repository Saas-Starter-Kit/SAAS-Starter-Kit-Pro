import jwt_decode from 'jwt-decode';
import { navigate } from 'gatsby';
import * as Yup from 'yup';
import { SignupToServer, LoginToServer } from '../../../api/authApi';
import axios from 'axios';

//valid format for setting an email and password
export const ValidSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(3, 'Password must be at least 3 Characters')
    .max(50, 'Password Too Long')
    .required('Password Required')
});

//Save user Info to Context
export const LogintoContext = async (user_id, authRes, stripeKey, LogIn) => {
  console.log(authRes);
  console.log(user_id);

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

//Save information from firebase to our own db
export const saveToDb = async (authRes, LogIn, isLogin, firebase, setResMessage, setLoading) => {
  console.log(authRes);
  let username = authRes.user.displayName;
  let token = await firebase.auth().currentUser.getIdToken();

  //server auth, returns jwt token
  let serverRes;
  if (isLogin) {
    serverRes = await LoginToServer(token, username);
  } else {
    serverRes = await SignupToServer(token, username);
  }

  let userId;
  let email = authRes.user.email;

  if (serverRes.data.token) {
    userId = jwt_decode(serverRes.data.token).user;
  } else if (serverRes.data.type === 'error') {
    console.log(serverRes);
    setLoading(false);
    setResMessage(serverRes.data.message);
    return;
  } else {
    setLoading(false);
    setResMessage('Authentication Failed Please Try Again');
    return;
  }

  console.log(userId, serverRes);

  let data = {
    userId,
    email
  };

  //create stripe customer based on our own server user id
  let stripeServerRes;
  //if (!isLogin) {
  stripeServerRes = await axios.post('http://localhost/stripe/customer', data);
  //}

  console.log();

  if (!stripeServerRes) {
    setLoading(false);
    setResMessage('Authentication Failed Please Try Again');
    return;
  }

  //save user data to React context
  LogintoContext(userId, authRes, stripeServerRes, LogIn);
};
