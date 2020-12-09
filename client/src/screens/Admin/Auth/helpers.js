import jwt_decode from "jwt-decode"
import { navigate } from "gatsby"
import * as Yup from "yup"

//valid format for setting an email and password
export const ValidSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(3, "Password must be at least 3 Characters")
    .max(50, "Password Too Long")
    .required("Password Required"),
})

//Save user Info to Context
export const LogintoContext = (data, authRes, LogIn) => {
  let email = authRes.user.email
  let username = authRes.user.displayName
    ? authRes.user.displayName
    : authRes.user.email
  let id = jwt_decode(data.token)
  let photo = authRes.user.photoURL
  let provider = authRes.user.providerData[0].providerId

  let user = {
    email,
    username,
    id,
    photo,
    provider,
  }

  LogIn(user)
  setTimeout(() => navigate("/app"), 200)
}
