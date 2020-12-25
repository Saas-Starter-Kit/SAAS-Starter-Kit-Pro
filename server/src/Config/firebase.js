import firebase from 'firebase-admin';
import serviceAccount from '../../firebase-admin.json';

const firebaseAdmin = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.FirebaseDatabaseUrl
});

export default firebaseAdmin;
