import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import { SignUp, Login, PasswordReset, EmailConfirm, ConfirmedEmail } from '../screens/Auth';

const Routes = ({ location }) => {
  return (
    <Router>
      <SignUp path="/auth/signup" />
      <Login location={location} path="/auth/login" />
      <PasswordReset path="/auth/passwordreset" />
      <EmailConfirm path="/auth/emailconfirm" />
      <ConfirmedEmail location={location} path="/auth/confirmedemail" />
    </Router>
  );
};

export default Routes;
