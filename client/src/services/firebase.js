import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN
};

firebase.initializeApp(config);
