import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import { SignUp, Login, PasswordReset, EmailConfirm, ConfirmedEmail } from '../screens/Auth';

const Routes = () => {
  return (
    <Router>
      <Login path="/auth/login" />
      <SignUp path="/auth/signup" />
      <PasswordReset path="/auth/passwordreset" />
      <EmailConfirm path="/auth/emailconfirm" />
      <ConfirmedEmail path="/auth/confirmedemail" />
      <Login path="/auth" />
    </Router>
  );
};

export default Routes;
