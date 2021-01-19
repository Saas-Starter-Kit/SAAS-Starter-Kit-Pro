import React from 'react';
import { Link, navigate } from 'gatsby';

const CheckAuth = () => {
  //useeffect check for authstate.user and is authenticated
  //if auth navigate to payment
  //if not

  return (
    <div>
      <h1>Check Auth</h1>
      <Link to="/auth/login" state={{ isPaymentFlow: true }}>
        Login
      </Link>
      <Link to="/auth/signup"> Signup</Link>
    </div>
  );
};

export default CheckAuth;
