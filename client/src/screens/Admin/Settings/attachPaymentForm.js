import React, { useState, useEffect, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import AuthContext from '../../../utils/authContext';
import { colors, breakpoints } from '../../../styles/theme';
import styled from 'styled-components';
import LoadingOverlay from '../../../components/Admin/Common/loadingOverlay';

const ButtonWrapper = styled.div`
  padding-top: 2rem;
  padding-bottom: 1rem;
  background-color: ${colors.white};
  text-align: left;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.6rem 2rem 0.6rem 2rem;
  font-weight: 500;
  color: ${colors.white};
  background-color: ${colors.indigo600};
  border: 1px solid transparent;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  &:hover {
    background-color: ${colors.indigo500};
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  &:active {
    background-color: ${colors.indigo600};
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

const Header = styled.h2`
  margin-bottom: 4rem;
`;

const ErrorResponse = styled.div`
  font-size: 0.9rem;
  color: red;
  font-weight: 100;
  margin-bottom: 1rem;
  margin-top: -3rem;
`;

const SuccessResponse = styled.div`
  font-size: 0.9rem;
  color: green;
  font-weight: 100;
  margin-bottom: 1rem;
  margin-top: -3rem;
`;

const AttachPaymentForm = () => {
  const { authState } = useContext(AuthContext);

  const [resMessage, setResMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [setupIntentState, setSetupIntent] = useState();
  const [isLoading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const createSetupIntent = async () => {
    let data = { customer: authState.user };
    const result = await axios.post('http://localhost/stripe/wallet', data);
    if (!result) setResMessage('Payment Setup Failed, Please Contact Support');

    setSetupIntent(result.data);
  };

  useEffect(() => {
    if (authState.user) createSetupIntent();
    console.log(authState);
  }, [authState]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { setupIntent, error } = await stripe.confirmCardSetup(setupIntentState.client_secret, {
      payment_method: { card: cardElement }
    });

    if (!setupIntent && error) {
      setLoading(false);
      setResMessage(error.message);
      return;
    } else if (!setupIntent && !error) {
      setLoading(false);
      setResMessage('Card confirmation failed, please contact support');
      return;
    }

    let data = {
      payment_method: setupIntent.payment_method,
      customer: authState.user
    };

    const result = await axios.post('http://localhost/stripe/attach-payment', data);
    if (!result) {
      setLoading(false);
      setResMessage('Adding Payment method failed, please contact support');
      return;
    }

    if (result) {
      setLoading(false);
      setSuccessMessage('Payment Method Successfully updated');
      return;
    }
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <Header>Add a Payment Method</Header>
      <ErrorResponse>{resMessage}</ErrorResponse>
      <SuccessResponse>{successMessage}</SuccessResponse>
      {!successMessage && !resMessage && (
        <>
          <form onSubmit={handleSubmit}>
            <CardElement />
            <ButtonWrapper>
              <Button type="submit" disabled={!stripe && !setupIntentState}>
                Add
              </Button>
            </ButtonWrapper>
          </form>
          <p>Adding a card will make it the default payment method</p>
        </>
      )}
      <button onClick={() => console.log(setupIntentState)}>FFFFF</button>{' '}
    </>
  );
};

export default AttachPaymentForm;
