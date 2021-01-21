import React from 'react';
import CheckoutForm from './checkoutForm';
import stripeConfig from '../../../services/stripe';
import { Elements } from '@stripe/react-stripe-js';

const Purchase = ({ location }) => {
  return (
    <Elements stripe={stripeConfig}>
      <CheckoutForm location={location} />
    </Elements>
  );
};

export default Purchase;
