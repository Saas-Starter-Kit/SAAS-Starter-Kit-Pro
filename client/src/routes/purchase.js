import React, { useContext, useEffect } from 'react';
import { Router } from '@reach/router';
import Payment from '../screens/User/Purchase/Payment';

const Routes = () => {
  return (
    <Router>
      <Payment path="/purchase/payment" />
    </Router>
  );
};

export default Routes;
