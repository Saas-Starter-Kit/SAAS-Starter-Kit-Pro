import jwt_decode from "jwt-decode"
import { navigate } from "gatsby"
import * as Yup from "yup"
import { SignupToServer } from "../../../api/authApi"
import axios from "axios"

//valid format for setting an email and password
export const ValidSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(3, "Password must be at least 3 Characters")
    .max(50, "Password Too Long")
    .required("Password Required"),
})

//Save user Info to Context
export const LogintoContext = (user_id, authRes, stripeKey, LogIn) => {
  console.log(authRes)
  console.log(user_id)

  let email = authRes.user.email
  let username = authRes.user.displayName
    ? authRes.user.displayName
    : authRes.user.email
  let id = user_id
  let photo = authRes.user.photoURL
  let provider = authRes.user.providerData[0].providerId
  let stripeCustomerKey = stripeKey.data.stripecustomerid

  console.log(stripeCustomerKey)

  let user = {
    email,
    username,
    id,
    photo,
    provider,
    stripeCustomerKey,
  }

  LogIn(user)
  setTimeout(() => navigate("/app"), 200)
}

//Save information from firebase to our own db
export const saveToDb = async (
  authRes,
  LogIn,
  isLogin,
  firebase,
  setResMessage
) => {
  let username = authRes.user.displayName
  console.log(authRes)

  let token = await firebase.auth().currentUser.getIdToken()
  //server auth, returns jwt token
  let serverRes = await SignupToServer(token, username)

  let userId
  let email = authRes.user.email

  if (serverRes.data.token) {
    userId = jwt_decode(serverRes.data.token).user
  } else {
    console.log(serverRes)
    setResMessage(serverRes.data)
    return
  }

  console.log(userId, serverRes)

  let data = {
    userId,
    email,
  }

  //create stripe customer based on our own server user id
  const stripeServerRes = await axios.post(
    "http://localhost/stripe/customer",
    data
  )

  LogintoContext(userId, authRes, stripeServerRes, LogIn)
}

//Save information from firebase to our own db
//const saveToDb = (authRes, LogIn) => {
//  let username = authRes.user.displayName
//  console.log(authRes)

//  firebase
//    .auth()
//    .currentUser.getIdToken()
//    .then(token => LoginToServer(token, username))
//    .then(res =>
//      !res.data.type === "error"
//        ? LogintoContext(res.data, authRes, LogIn)
//        : setResMessage(res.data.message)
//    )
//    .catch(error => {
//      console.log(error)
//      setResMessage(error.message)
//    })
//}
