import React, { useState, useEffect, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import { colors, breakpoints } from '../../../styles/theme';
import styled from 'styled-components';

import { Spin } from 'antd';
import axios from '../../../services/axios';

const ButtonWrapper = styled.div`
  padding-top: 2rem;
  padding-bottom: 1rem;
  background-color: ${colors.white};
  text-align: left;
`;

const Card = styled.div`
  background-color: ${colors.white};
  width: 100%;
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @media (min-width: ${breakpoints.large}) {
    width: 75%;
  }
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

const SuccessResponse = styled.div`
  font-size: 0.9rem;
  color: green;
  font-weight: 100;
  margin-bottom: 1rem;
  margin-top: -3rem;
`;

const AttachPaymentForm = () => {
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;

  const [successMessage, setSuccessMessage] = useState('');
  const [setupIntentState, setSetupIntent] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const createSetupIntent = async () => {
    let data = { customer: authState.user };
    const result = await axios.post('/stripe/wallet', data).catch((err) => {
      fetchFailure(err);
    });

    setSetupIntent(result.data);
  };

  useEffect(() => {
    if (authState.user) createSetupIntent();
    console.log(authState);
  }, [authState]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchInit();

    const cardElement = elements.getElement(CardElement);

    const { setupIntent, error } = await stripe.confirmCardSetup(setupIntentState.client_secret, {
      payment_method: { card: cardElement }
    });

    if (!setupIntent && error) {
      fetchFailure(error);
    } else if (!setupIntent && !error) {
      let error = {
        type: 'Stripe Confirmation Error',
        message: 'Stripe Confirmation Failed, Please contact support'
      };
      fetchFailure(error);
    }

    let data = {
      payment_method: setupIntent.payment_method,
      customer: authState.user
    };

    await axios.post('/stripe/attach-payment', data).catch((err) => {
      fetchFailure(err);
    });

    setSuccessMessage('Payment Method Successfully updated');
    fetchSuccess();
  };

  return (
    <Card>
      <Spin tip="Loading..." spinning={isLoading}>
        <Header>Add a Payment Method</Header>
        <SuccessResponse>{successMessage}</SuccessResponse>
        {!successMessage && (
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
      </Spin>
    </Card>
  );
};

export default AttachPaymentForm;
