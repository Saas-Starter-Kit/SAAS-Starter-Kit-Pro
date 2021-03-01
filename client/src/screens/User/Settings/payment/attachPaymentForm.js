import React, { useState, useEffect, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import { Spin } from 'antd';

import AuthContext from '../../../../utils/authContext';
import ApiContext from '../../../../utils/apiContext';
import { colors } from '../../../../styles/theme';
import axios from '../../../../services/axios';

import Card from '../../../../components/Common/Card';
import Button from '../../../../components/Common/buttons/PrimaryButton';

const ButtonWrapper = styled.div`
  padding-top: 2rem;
  padding-bottom: 1rem;
  background-color: ${colors.white};
  text-align: left;
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

  /* eslint-disable  */
  useEffect(() => {
    if (authState.user) createSetupIntent();
  }, [authState]);
  /* eslint-enable */

  const createSetupIntent = async () => {
    let data = { customer: authState.user };
    const result = await axios.post('/stripe/wallet', data).catch((err) => {
      fetchFailure(err);
    });

    setSetupIntent(result.data);
  };

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
          <div>
            <form onSubmit={handleSubmit}>
              <CardElement />
              <ButtonWrapper>
                <Button type="submit" disabled={!stripe && !setupIntentState}>
                  Add
                </Button>
              </ButtonWrapper>
            </form>
            <p>Adding a card will make it the default payment method</p>
          </div>
        )}
      </Spin>
    </Card>
  );
};

export default AttachPaymentForm;
