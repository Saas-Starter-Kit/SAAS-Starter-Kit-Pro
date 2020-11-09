import React, { useState, useReducer, useEffect } from 'react';
import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import { theme } from '../utils/styledComponentsTheme';
import AuthContext from '../utils/authContext';
import { authReducer, initialStateAuth } from '../store/reducers/authReducer';
import { Login, Logout } from '../store/actions/actions';

function MyApp({ Component, pageProps }) {
  const [text, changeText] = useState('TTTT');
  const NewText = () => {
    changeText('FFFFF');
  };

  return (
    <AuthContext.Provider value={{ text, NewText }}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default MyApp;
