import React, { useState, useEffect, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import AuthContext from '../../../../utils/authContext';
import ApiContext from '../../../../utils/apiContext';

import { colors, breakpoints } from '../../../../styles/theme';
import styled from 'styled-components';

import LoadingOverlay from '../../../../components/Common/loadingOverlay';

import PlanCard from './planCard';

import axios from '../../../../services/axios';

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

const CheckoutForm = ({ location }) => {
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;

  console.log(location);
  let Plan = location.state.plan;
  console.log(Plan);

  const premium_plan = process.env.GATSBY_STRIPE_PREMIUM_PLAN;
  const basic_plan = process.env.GATSBY_STRIPE_BASIC_PLAN;
  const free_plan = process.env.GATSBY_STRIPE_BASIC_PLAN;

  const [setupIntentState, setSetupIntent] = useState();
  const [isSuccess, setSuccess] = useState(false);
  const [plan, setPlan] = useState(free_plan);
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

    const result = await axios.post('/stripe/wallet', data).catch((err) => {
      fetchFailure(err);
    });

    setSetupIntent(result.data);
  };

  useEffect(() => {
    if (authState.user) createSetupIntent();
  }, [authState]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchInit();

    const cardElement = elements.getElement(CardElement);

    const { setupIntent, error } = await stripe
      .confirmCardSetup(setupIntentState.client_secret, {
        payment_method: { card: cardElement }
      })
      .catch((err) => {
        fetchFailure(err);
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

    let payment_method = setupIntent.payment_method;
    let customer = authState.user;
    let planSelect = plan;

    let data = { payment_method, customer, planSelect };

    let result = await axios.post('/stripe/create-subscription', data).catch((err) => {
      fetchFailure(err);
    });

    console.log(result);
    if (result.data.status === 'active' || result.data.status === 'trialing') {
      fetchSuccess();
      setSuccess(true);
    } else {
      let error = {
        type: 'Stripe Confirmation Error',
        message: 'Stripe Confirmation Failed, Please contact support'
      };
      fetchFailure(error);
    }
  };

  return (
    <Wrapper>
      {isLoading && <LoadingOverlay />}

      <CardWrapper>
        <PlanCard setBasic={setBasic} setPremium={setPremium} isBasicActive={isBasicActive} />
        <Card>
          <form onSubmit={handleSubmit}>
            <CardElement />
            <ButtonWrapper>
              <Button type="submit" disabled={!stripe && !setupIntentState}>
                Pay
              </Button>
            </ButtonWrapper>
          </form>
        </Card>
      </CardWrapper>
    </Wrapper>
  );
};

export default CheckoutForm;
