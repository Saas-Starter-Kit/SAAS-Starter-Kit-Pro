import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyABrhAsT8e2cimHbPffpz-r2RkcgThSmR0',
  authDomain: 'react-gatsby1.firebaseapp.com'
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const firebaseApp = firebase;
