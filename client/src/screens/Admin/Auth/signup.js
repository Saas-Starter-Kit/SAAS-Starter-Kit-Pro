import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { Formik } from "formik"

import AuthContext from "../../../utils/authContext"
import { SignupToServer } from "../../../api/authApi"
import { ValidSchema, LogintoContext } from "./helpers"

import LoadingOverlay from "../../../components/Admin/Common/loadingOverlay"
import { colors, breakpoints } from "../../../styles/theme"
import SignUpFormHeader from "./signupFormHeader"

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const { firebase, LogIn, LogOut } = useContext(AuthContext)

  //Save information from firebase to our own db
  const saveToDb = (authRes, LogIn) => {
    let username = authRes.user.displayName
    console.log(authRes)

    firebase
      .auth()
      .currentUser.getIdToken()
      .then(token => SignupToServer(token, username))
      .then(res => LogintoContext(res.data, authRes, LogIn))
      .catch(error => console.log(error))
  }

  const handleSubmit = values => {
    setLoading(true)

    let email = values.email
    let password = values.password

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(authRes => saveToDb(authRes, LogIn))
      .catch(error => console.log(error))
  }

  //Google OAuth2 Signin
  const GoogleSignin = () => {
    let provider = new firebase.auth.GoogleAuthProvider()

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(authRes => saveToDb(authRes))
      .catch(error => console.log(error))
  }

  return (
    <div>
      <SignUpFormHeader />
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
              SignUp
            </button>
          </form>
        )}
      </Formik>
      <button onClick={GoogleSignin}>Google</button>
    </div>
  )
}

export default Signup
