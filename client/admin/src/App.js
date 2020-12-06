import React, { useReducer } from 'react';
import 'antd/dist/antd.css';
import { ThemeProvider } from 'styled-components';
import './styles/globals.css';
import { theme } from './styles/theme';
import AuthContext from './utils/authContext';
import { authReducer, initialStateAuth } from './store/reducers/authReducer';
import { Login, Logout } from './store/actions/actions';
import { firebaseApp as firebase } from './services/firebase';
import Routes from './routes';

function App() {
  const [authState, dispatchAuth] = useReducer(authReducer, initialStateAuth);

  const LogIn = (user) => {
    dispatchAuth(Login(user));
  };

  const LogOut = () => {
    dispatchAuth(Logout);
    firebase.auth().signOut();
  };

  return (
    <AuthContext.Provider value={{ authState, LogIn, LogOut, firebase }}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
