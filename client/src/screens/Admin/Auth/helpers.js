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

//Save user information to our own db and and create stripe customer
export const saveToDb = async (authRes, LogIn, isLogin, firebase, setErrMessage, setLoading) => {
  console.log(authRes);

  //Get Auth token from Firebase
  let token = await firebase
    .auth()
    .currentUser.getIdToken()
    .catch((err) => {
      console.log(err);
      setLoading(false);
      setErrMessage('Login Failed, please contact support');
      throw new Error('Firebase Token Not Found');
    });

  //server authentication, returns jwt token
  let serverRes;
  let username = authRes.user.displayName ? authRes.user.displayName : authRes.user.email;
  let email = authRes.user.email;

  if (isLogin) {
    serverRes = await LoginToServer(email, token).catch((err) => {
      console.log(err);
      setLoading(false);
      setErrMessage('Server Login Failed, please refresh the browser and try again');
      throw new Error('Server Side Login Fail');
    });
  } else {
    serverRes = await SignupToServer(email, username, token).catch((err) => {
      console.log(err);
      setLoading(false);
      setErrMessage('Server Login Failed, please contact Support');
      throw new Error('Server Side Signup Fail');
    });
  }

  let userId;
  //refactor
  if (serverRes.data.token) {
    userId = jwt_decode(serverRes.data.token).user;
  } else if (serverRes.data.type === 'error') {
    console.log(serverRes);
    setLoading(false);
    setErrMessage(serverRes.data.message);
    return;
  }

  console.log(userId, serverRes);

  let data = {
    userId,
    email
  };

  //create stripe customer based on our own server user id
  //let stripeServerRes;
  //if (!isLogin) {
  //  stripeServerRes = await axios.post('http://localhost/stripe/customer', data).catch((err) => {
  //    console.log(err);
  //    setLoading(false);
  //    setErrMessage('Sign-Up Failed, Please Contact support');
  //    throw new Error('Stripe Signup Fail');
  //  });
  //} else {
  //  //get customer stripe info
  //}

  console.log();

  //save user data to React context
  //LogintoContext(userId, authRes, stripeServerRes, LogIn);
};
