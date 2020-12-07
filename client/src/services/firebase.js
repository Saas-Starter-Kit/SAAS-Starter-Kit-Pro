import firebase from "firebase/app"
import "firebase/auth"

const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const firebaseApp = firebase
