import React, { useState, useReducer, useEffect } from "react"
import AuthContext from "./authContext"
import { authReducer, initialStateAuth } from "../store/reducers/authReducer"
import { Login, Logout } from "../store/actions/actions"
import { firebaseApp as firebase } from "../services/firebase"
import { ThemeProvider } from "styled-components"
import { theme } from "../styles/theme"

const RootWrapper = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, initialStateAuth)

  const LogIn = user => {
    dispatchAuth(Login(user))
  }

  const LogOut = () => {
    dispatchAuth(Logout)
    firebase.auth().signOut()
  }

  useEffect(() => {
    silentAuth()
  }, []) // eslint-disable-line

  const silentAuth = () => {
    let user, expiresAt

    user = JSON.parse(localStorage.getItem("user"))
    expiresAt = JSON.parse(localStorage.getItem("expiresIn"))

    if (user && new Date().getTime() < expiresAt) {
      LogIn(user)
    } else if (!user || new Date().getTime() > expiresAt) {
      LogOut()
    }
  }

  return (
    <AuthContext.Provider value={{ authState, LogIn, LogOut, firebase }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AuthContext.Provider>
  )
}

export default RootWrapper
