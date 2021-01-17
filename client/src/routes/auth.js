import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import { SignUp, Login, PasswordReset, EmailConfirm, ConfirmedEmail } from '../screens/User/Auth';

const Routes = ({ location }) => {
  return (
    <Router>
      <SignUp path="/auth/signup" />
      <Login path="/auth/login" />
      <PasswordReset path="/auth/passwordreset" />
      <EmailConfirm path="/auth/emailconfirm" />
      <ConfirmedEmail location={location} path="/auth/confirmedemail" />
    </Router>
  );
};

export default Routes;
