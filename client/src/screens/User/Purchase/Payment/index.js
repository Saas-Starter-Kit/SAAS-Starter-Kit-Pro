import React from 'react';
import CheckoutForm from './checkoutForm';
import stripeConfig from '../../../../services/stripe';
import { Elements } from '@stripe/react-stripe-js';

const Purchase = () => {
  return (
    <Elements stripe={stripeConfig}>
      <CheckoutForm />
    </Elements>
  );
};

export default Purchase;
