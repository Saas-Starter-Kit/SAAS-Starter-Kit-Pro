import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import { SignUp, Login, PasswordReset, EmailConfirm } from '../screens/User/Auth';

const Routes = () => {
  return (
    <Router>
      <SignUp path="/auth/signup" />
      <Login path="/auth/login" />
      <PasswordReset path="/auth/passwordreset" />
      <EmailConfirm path="/auth/emailconfirm" />
    </Router>
  );
};

export default Routes;
