import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import Payment from '../screens/User/Purchase/Payment';
import CheckAuth from '../screens/User/Purchase/CheckAuth';

const Routes = () => {
  return (
    <Router>
      <CheckAuth path="/purchase" />
      <Payment path="/purchase/payment" />
    </Router>
  );
};

export default Routes;
