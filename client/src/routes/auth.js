import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import { SignUp, Login, PasswordReset, EmailConfirm, ConfirmedEmail } from '../screens/Auth';

const Routes = ({ location }) => {
  return (
    <Router>
      <Login location={location} path="/auth/login" />
      <SignUp location={location} path="/auth/signup" />
      <PasswordReset path="/auth/passwordreset" />
      <EmailConfirm path="/auth/emailconfirm" />
      <ConfirmedEmail location={location} path="/auth/confirmedemail" />
      <Login location={location} path="/auth" />
    </Router>
  );
};

export default Routes;
