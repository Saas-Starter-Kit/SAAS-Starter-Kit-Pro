import React, { useContext, useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import { navigate } from "gatsby"
import styled from "styled-components"
import { Formik } from "formik"

import * as Yup from "yup"
import AuthContext from "../../../utils/authContext"

import LoadingOverlay from "../../../components/Admin/Common/loadingOverlay"
import { colors, breakpoints } from "../../../styles/theme"
import LoginFormHeader from "./loginFormHeader"

const ValidSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  subject: Yup.string()
    .min(3, "Subject must be at least 3 Characters")
    .max(50, "Subject Too Long")
    .required("Subject Required"),
})

const Signup = () => {
  const { firebase, LogIn, LogOut } = useContext(AuthContext)
  const handleSubmit = event => {
    event.preventDefault()
    let email = event.target
    let password = event.target

    console.log(email, password)
  }

  return (
    <div>
      Sign Up
      <Formik
        validationSchema={ValidSchema}
        initialValues={{ emaillogin: "", passwordlogin: "" }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="emaillogin">Username or Email:</label>
            <input
              type="email"
              name="emaillogin"
              id="emaillogin"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.emaillogin}
            />
            <label htmlFor="passwordlogin">Password:</label>
            <input
              type="password"
              name="passwordlogin"
              id="passwordlogin"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.passwordlogin}
            />
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Signup
