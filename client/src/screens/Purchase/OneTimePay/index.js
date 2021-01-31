import React from 'react';
import { Elements } from '@stripe/react-stripe-js';

import stripeConfig from '../../../services/stripe';

import CheckoutForm from './checkoutForm';

const OneTimePay = () => {
  return (
    <Elements stripe={stripeConfig}>
      <CheckoutForm />
    </Elements>
  );
};

export default OneTimePay;
