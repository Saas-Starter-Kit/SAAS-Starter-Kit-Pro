import React, { useState, useEffect, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import AuthContext from '../../../utils/authContext';
import { colors, breakpoints } from '../../../styles/theme';
import styled from 'styled-components';
import LoadingOverlay from '../../../components/Admin/Common/loadingOverlay';
import ConfirmSub from './confirmSubscription';
import PlanCard from './planCard';
import { createSubscription } from '../../../api/stripeApi';

const Wrapper = styled.div`
  background-color: ${colors.gray50};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const ButtonWrapper = styled.div`
  padding-top: 2rem;
  padding-bottom: 1rem;
  background-color: ${colors.white};
  text-align: left;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-weight: 500;
  width: 100%;
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

const CardWrapper = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  max-width: 36rem;

  @media (min-width: ${breakpoints.small}) {
    margin-left: auto;
    margin-right: auto;
    padding-left: 2rem;
    padding-right: 2rem;
    width: 100%;
  }
`;

const Card = styled.div`
  background-color: ${colors.white};
  padding: 2rem 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @media (min-width: ${breakpoints.small}) {
    border-radius: 0.5rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
`;

const ErrorResponse = styled.div`
  font-size: 0.9rem;
  color: red;
  font-weight: 100;
  margin-bottom: 1rem;
`;

const CheckoutForm = () => {
  const { authState } = useContext(AuthContext);

  const premium_plan = process.env.GATSBY_STRIPE_PREMIUM_PLAN;
  const basic_plan = process.env.GATSBY_STRIPE_BASIC_PLAN;

  const [resMessage, setResMessage] = useState('');
  const [setupIntentState, setSetupIntent] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [plan, setPlan] = useState(basic_plan);
  const [isBasicActive, setBasicActive] = useState(true);

  const setPremium = () => {
    setPlan(premium_plan);
    setBasicActive(false);
  };

  const setBasic = () => {
    setPlan(basic_plan);
    setBasicActive(true);
  };

  const stripe = useStripe();
  const elements = useElements();

  const createSetupIntent = async () => {
    let data = { customer: authState.user };
    const result = await axios.post('http://localhost/stripe/wallet', data).catch((err) => {
      console.log(err);
      setResMessage('Payment Setup Failed, Please Contact Support');
      throw new Error('Create Setup Intent on Server Failed');
    });

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

    const { setupIntent, error } = await stripe
      .confirmCardSetup(setupIntentState.client_secret, {
        payment_method: { card: cardElement }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setResMessage('Card confirmation failed, please contact support');
        throw new Error('Stripe Setup Intent Failed');
      });

    if (!setupIntent && error) {
      setLoading(false);
      setResMessage(error.message);
      throw new Error('User Card Confirmation Error');
    } else if (!setupIntent && !error) {
      setLoading(false);
      setResMessage('Card confirmation failed, please contact support');
      throw new Error('Stripe Setup Intent Failed');
    }

    let result = await createSubscription(setupIntent.payment_method, authState.user, plan).catch(
      (err) => {
        console.log(err);
        setLoading(false);
        setResMessage('Create Subscription failed, please contact support');
        throw new Error('Server Side Create Subscription Failed');
      }
    );

    console.log(result);
    if (result.data.status === 'active' || result.data.status === 'trialing') {
      setLoading(false);
      setSuccess(true);
    } else {
      setLoading(false);
      setResMessage('Subscription Confirmation Failed, please contact support');
      throw new Error('Server Side Create Subscription Failed');
    }
  };

  return (
    <Wrapper>
      {isLoading && <LoadingOverlay />}
      {!isSuccess ? (
        <CardWrapper>
          <PlanCard setBasic={setBasic} setPremium={setPremium} isBasicActive={isBasicActive} />
          <Card>
            <ErrorResponse>{resMessage}</ErrorResponse>
            <form onSubmit={handleSubmit}>
              <CardElement />
              <ButtonWrapper>
                <Button type="submit" disabled={!stripe && !setupIntentState}>
                  Pay
                </Button>
              </ButtonWrapper>
            </form>
            <button onClick={() => console.log(setupIntentState)}>FFFFF</button>
          </Card>
        </CardWrapper>
      ) : (
        <ConfirmSub />
      )}
    </Wrapper>
  );
};

export default CheckoutForm;
