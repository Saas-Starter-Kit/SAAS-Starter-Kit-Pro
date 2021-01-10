import React, { useState, useReducer, useEffect } from 'react';

import AuthContext from './authContext';
import { authReducer, initialStateAuth } from '../store/reducers/authReducer';
import { Login, Logout } from '../store/actions/actions';

import ApiContext from './apiContext';
import { apiReducer, initialStateApi } from '../store/reducers/apiReducer';
import { Fetch_failure, Fetch_init, Fetch_success } from '../store/actions/actions';

import CaslContext from './caslContext';
import { ability } from './caslAbility';

import { firebaseApp as firebase } from '../services/firebase';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

const RootWrapper = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, initialStateAuth);
  const [apiState, dispatchApi] = useReducer(apiReducer, initialStateApi);

  const LogIn = (user) => {
    dispatchAuth(Login(user));
  };

  const LogOut = () => {
    dispatchAuth(Logout);
    firebase.auth().signOut();
  };

  const fetchFailure = (error) => {
    dispatchApi(Fetch_failure(error));
    throw new Error('Error Detected, code execution stopped');
  };

  const fetchInit = () => {
    dispatchApi(Fetch_init);
  };

  const fetchSuccess = () => {
    dispatchApi(Fetch_success);
  };

  useEffect(() => {
    silentAuth();
  }, []); // eslint-disable-line

  const silentAuth = () => {
    let user, expiresAt;

    user = JSON.parse(localStorage.getItem('user'));
    expiresAt = JSON.parse(localStorage.getItem('expiresIn'));

    if (user && new Date().getTime() < expiresAt) {
      LogIn(user);
    } else if (!user || new Date().getTime() > expiresAt) {
      LogOut();
    }
  };

  return (
    <AuthContext.Provider value={{ authState, LogIn, LogOut, firebase }}>
      <ApiContext.Provider value={{ apiState, fetchFailure, fetchInit, fetchSuccess }}>
        <CaslContext.Provider value={ability}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CaslContext.Provider>
      </ApiContext.Provider>
    </AuthContext.Provider>
  );
};

export default RootWrapper;
