import React, { useContext, useEffect, useState } from "react"

import styled from "styled-components"
import { Formik } from "formik"

import AuthContext from "../../../utils/authContext"
import { LoginToServer } from "../../../api/authApi"
import { ValidSchema, LogintoContext } from "./helpers"

import LoadingOverlay from "../../../components/Admin/Common/loadingOverlay"
import { colors, breakpoints } from "../../../styles/theme"
import LoginFormHeader from "../../../components/Admin/Auth/loginFormHeader"

const Wrapper = styled.div`
  background-color: ${colors.gray50};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -4rem;

  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`

const CardWrapper = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;

  @media (min-width: ${breakpoints.small}) {
    margin-left: auto;
    margin-right: auto;
    padding-left: 2rem;
    padding-right: 2rem;
    width: 100%;
    max-width: 28rem;
  }
`

const Card = styled.div`
  background-color: ${colors.white};
  padding: 2rem 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @media (min-width: ${breakpoints.small}) {
    border-radius: 0.5rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
`

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { firebase, LogIn, LogOut } = useContext(AuthContext)

  //Save information from firebase to our own db
  const saveToDb = (authRes, LogIn) => {
    let username = authRes.user.displayName
    console.log(authRes)

    firebase
      .auth()
      .currentUser.getIdToken()
      .then(token => LoginToServer(token, username))
      .then(res => LogintoContext(res.data, authRes, LogIn))
      .catch(error => console.log(error))
  }

  const handleSubmit = values => {
    setLoading(true)

    let email = values.email
    let password = values.password

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(authRes => saveToDb(authRes, LogIn))
      .catch(error => console.log(error))
  }

  //Google OAuth2 Signin
  const GoogleSignin = () => {
    let provider = new firebase.auth.GoogleAuthProvider()

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(authRes => saveToDb(authRes, LogIn))
      .catch(error => console.log(error))
  }

  return (
    <div>
      <LoginFormHeader />
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

export default Login
