import React from 'react';
import AttachPaymentForm from './attachPaymentForm';
import stripeConfig from '../../../services/stripe';
import { Elements } from '@stripe/react-stripe-js';

const AttachPaymentFormWrapper = () => {
  return (
    <Elements stripe={stripeConfig}>
      <AttachPaymentForm />
    </Elements>
  );
};

export default AttachPaymentFormWrapper;
