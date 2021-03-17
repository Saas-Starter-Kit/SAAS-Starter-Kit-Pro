import React, { useState, useContext, useEffect } from 'react';
import { message } from 'antd';
import { navigate } from 'gatsby';
import styled from 'styled-components';

import OrgContext from '../../../../utils/orgContext';
import ApiContext from '../../../../utils/apiContext';
import axios from '../../../../services/axios';

import SEO from '../../../../components/Marketing/Layout/seo';
import SettingsHeader from '../../../../components/App/Navigation/settingsHeader';
import LoadingOverlay from '../../../../components/Common/loadingOverlay';
import NullSubscriptionCard from './NullSubscriptionCard';
import CancelSubscriptionCard from './cancelSubscirptionCard';
import PaymentInformationCard from './paymentInformationCard';
import UpgradeSubscription from './upgradeSubscription';

const Wrapper = styled.div``;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const SubscriptionSettings = ({ org_id }) => {
  const premium_plan = process.env.GATSBY_STRIPE_PREMIUM_PLAN;
  const basic_plan = process.env.GATSBY_STRIPE_BASIC_PLAN;

  const premium_price = process.env.GATSBY_STRIPE_PREMIUM_PLAN_PRICE;
  const basic_price = process.env.GATSBY_STRIPE_BASIC_PLAN_PRICE;

  const premium_type = process.env.GATSBY_STRIPE_PREMIUM_PLAN_TYPE;
  const basic_type = process.env.GATSBY_STRIPE_BASIC_PLAN_TYPE;

  const { orgState, primary_email } = useContext(OrgContext);
  const { stripe_customer_id } = orgState;
  const { fetchFailure, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;

  const [isModalSub, setModalSub] = useState(false);

  //stripe payment state
  const [subscriptionState, setSubscription] = useState();
  const [planType, setPlanType] = useState();
  const [price, setPrice] = useState();

  /* eslint-disable */
  useEffect(() => {
    if (stripe_customer_id) {
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
  /* eslint-enable */

  /* 
      Stripe Methods
  */

  const getSubscription = async () => {
    let params = { email: primary_email };

    const subscription = await axios.get('/stripe/get-subscription', { params }).catch((err) => {
      fetchFailure(err);
    });

    if (subscription.data.plan) setSubscription(subscription.data);
  };

  const cancelSubscription = async () => {
    setModalSub(false);
    let data = {
      email: primary_email
    };

    await axios.post('/stripe/cancel-subscription', data).catch((err) => {
      fetchFailure(err);
    });

    setModalSub(false);
    message.success('Subscription Canceled');
  };

  /* 
      Helper Methods
  */

  const setCurrentSubscription = () => {
    if (subscriptionState.plan.id === premium_plan) {
      setPrice(premium_price);
      setPlanType(premium_type);
    } else if (subscriptionState.plan.id === basic_plan) {
      setPrice(basic_price);
      setPlanType(basic_type);
    }
  };

  const handleModalSubCancel = () => {
    setModalSub(false);
  };

  const seoData = {
    title: 'Saas Starter Kit Pro Subscription page',
    description: 'Saas Starter Kit Pro Subscription page'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <Wrapper>
        <SettingsHeader org_id={org_id} />

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
    </React.Fragment>
  );
};

export default SubscriptionSettings;
