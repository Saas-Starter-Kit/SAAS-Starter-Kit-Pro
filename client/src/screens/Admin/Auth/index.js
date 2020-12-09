import React, { useContext, useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import { navigate } from "gatsby"
import styled from "styled-components"
import { Formik } from "formik"
import * as Yup from "yup"
import AuthContext from "../../../utils/authContext"
import {
  sendtokenToServer,
  SignupToServer,
  LoginToServer,
} from "../../../api/authApi"

import LoadingOverlay from "../../../components/Admin/Common/loadingOverlay"
import { colors, breakpoints } from "../../../styles/theme"
import LoginFormHeader from "./loginFormHeader"

const ValidSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(3, "Password must be at least 3 Characters")
    .max(50, "Password Too Long")
    .required("Password Required"),
})

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const { firebase, LogIn, LogOut } = useContext(AuthContext)

  const saveToDb = authRes => {
    let username = authRes.user.displayName
    console.log(authRes)

    firebase
      .auth()
      .currentUser.getIdToken()
      .then(token => LoginToServer(token, username))
      .then(res => console.log(res))
  }

  const GoogleSignin = () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(authRes => saveToDb(authRes))
      .catch(error => console.log(error))
  }

  const handleSubmit = values => {
    setLoading(true)

    let email = values.email
    let password = values.password

    firebase
      .auth()
      //.createUserWithEmailAndPassword(email, password)
      .signInWithEmailAndPassword(email, password)
      .then(authRes => saveToDb(authRes))
  }

  return (
    <div>
      Sign Up
      <Formik
        validationSchema={ValidSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && <span>{errors.email}</span>}
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && (
              <span>{errors.password}</span>
            )}
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </form>
        )}
      </Formik>
      <button onClick={GoogleSignin}>Google</button>
    </div>
  )
}

export default Signup
