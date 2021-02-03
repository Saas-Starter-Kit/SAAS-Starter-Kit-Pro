import React, { useState, useContext, useEffect } from 'react';
import { message } from 'antd';
import { navigate } from 'gatsby';
import styled from 'styled-components';

import AuthContext from '../../../../utils/authContext';
import ApiContext from '../../../../utils/apiContext';
import axios from '../../../../services/axios';

import LoadingOverlay from '../../../../components/Common/loadingOverlay';
import NullSubscriptionCard from './NullSubscriptionCard';
import CancelSubscriptionCard from './cancelSubscirptionCard';
import PaymentInformationCard from './paymentInformationCard';
import UpgradeSubscription from './upgradeSubscription';

const Wrapper = styled.div``;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const SubscriptionSettings = () => {
  const premium_plan = process.env.GATSBY_STRIPE_PREMIUM_PLAN;
  const basic_plan = process.env.GATSBY_STRIPE_BASIC_PLAN;

  const premium_price = process.env.GATSBY_STRIPE_PREMIUM_PLAN_PRICE;
  const basic_price = process.env.GATSBY_STRIPE_BASIC_PLAN_PRICE;

  const premium_type = process.env.GATSBY_STRIPE_PREMIUM_PLAN_TYPE;
  const basic_type = process.env.GATSBY_STRIPE_BASIC_PLAN_TYPE;

  const { firebase, authState, LogOut } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;

  const [isModalSub, setModalSub] = useState(false);

  //stripe payment state
  const [subscriptionState, setSubscription] = useState();
  const [stripeCustomerId, setStripeId] = useState();
  const [plan, setPlan] = useState();
  const [planType, setPlanType] = useState();
  const [price, setPrice] = useState();

  //user state
  const [id, setId] = useState();

  useEffect(() => {
    if (authState.user) {
      setUser();
      getSubscription();
    }
  }, [authState]);

  useEffect(() => {
    if (subscriptionState) {
      setCurrentSubscription();
    }
  }, [subscriptionState]);

  useEffect(() => {
    return () => fetchSuccess();
  }, []);

  /*
      Auth Methods
  */

  const setUser = () => {
    let stripeCustomerId = authState.user.stripeCustomerKey;
    let id = authState.user.id;

    setId(id);
    setStripeId(stripeCustomerId);
  };

  /* 
      Stripe Methods
  */

  const getSubscription = async () => {
    let params = { email: authState.user.email };

    const subscription = await axios.get('/stripe/get-subscription', { params }).catch((err) => {
      fetchFailure(err);
    });

    if (subscription.data.plan) setSubscription(subscription.data);
  };

  const cancelSubscription = async () => {
    setModalSub(false);
    let data = {
      email: authState.user.email
    };

    await axios.post('/stripe/cancel-subscription', data).catch((err) => {
      fetchFailure(err);
    });

    setModalSub(false);
    LogOut();
    message.success('Subscription Canceled');
    setTimeout(() => navigate('/auth/login'), 500);
  };

  /* 
      Helper Methods
  */

  const setCurrentSubscription = () => {
    if (subscriptionState.plan.id == premium_plan) {
      setPlan(premium_plan);
      setPrice(premium_price);
      setPlanType(premium_type);
    } else if (subscriptionState.plan.id == basic_plan) {
      setPlan(basic_plan);
      setPrice(basic_price);
      setPlanType(basic_type);
    }
  };

  const handleModalSubCancel = () => {
    setModalSub(false);
  };

  return (
    <Wrapper>
      <Title>Subscription Settings</Title>
      {isLoading && <LoadingOverlay />}
      {!subscriptionState && <NullSubscriptionCard />}

      {subscriptionState && (
        <PaymentInformationCard
          planType={planType}
          price={price}
          subscriptionState={subscriptionState}
        />
      )}

      {subscriptionState && <UpgradeSubscription subscriptionState={subscriptionState} />}
      {subscriptionState && (
        <CancelSubscriptionCard
          setModalSub={setModalSub}
          isModalSub={isModalSub}
          handleModalSubCancel={handleModalSubCancel}
          cancelSubscription={cancelSubscription}
        />
      )}
    </Wrapper>
  );
};

export default SubscriptionSettings;
