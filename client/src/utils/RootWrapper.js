import React, { useState, useReducer } from "react"
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

  return (
    <AuthContext.Provider value={{ authState, LogIn, LogOut, firebase }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AuthContext.Provider>
  )
}

export default RootWrapper
