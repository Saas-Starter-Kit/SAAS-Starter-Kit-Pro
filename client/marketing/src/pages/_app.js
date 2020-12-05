import React from 'react';
import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
    </ThemeProvider>
  );
}

export default MyApp;
