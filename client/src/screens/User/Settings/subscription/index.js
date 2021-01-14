import React, { useState, useContext, useEffect } from 'react';

import { navigate } from 'gatsby';

import AuthContext from '../../../../utils/authContext';
import ApiContext from '../../../../utils/apiContext';

import LoadingOverlay from '../../../../components/Common/loadingOverlay';
import styled from 'styled-components';

import CancelSubscriptionCard from './cancelSubscirptionCard';
import PaymentInformationCard from './paymentInformationCard';

import axios from '../../../../services/axios';

const Wrapper = styled.div``;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const SubscriptionSettings = () => {
  const { firebase, authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;

  const [isModalSub, setModalSub] = useState(false);

  //stripe payment state
  const [subscriptionState, setSubscription] = useState();
  const [stripeCustomerId, setStripeId] = useState();

  //user state
  const [id, setId] = useState();

  useEffect(() => {
    if (authState.user) {
      setUser();
    }
  }, [authState]);

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

    setSubscription(subscription.data);
  };

  const cancelSubscription = async () => {
    setModalSub(false);
    let data = {
      email: authState.user.email
    };

    const subscriptionCancel = await axios
      .post('/stripe/cancel-subscription', data)
      .catch((err) => {
        fetchFailure(err);
      });

    fetchSuccess(true, subscriptionCancel);
    //replace with antd success message
    setModalSub(false);
    navigate('/login');
  };

  /* 
      Helper Methods
  */

  const handleModalSubCancel = () => {
    setModalSub(false);
  };

  return (
    <Wrapper>
      <Title>Account Settings</Title>
      {isLoading && <LoadingOverlay />}

      <PaymentInformationCard
        getSubscription={getSubscription}
        subscriptionState={subscriptionState}
      />
      <CancelSubscriptionCard
        setModalSub={setModalSub}
        isModalSub={isModalSub}
        handleModalSubCancel={handleModalSubCancel}
        cancelSubscription={cancelSubscription}
      />
    </Wrapper>
  );
};

export default SubscriptionSettings;
