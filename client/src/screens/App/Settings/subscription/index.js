import React, { useState, useContext, useEffect } from 'react';
import { message } from 'antd';
import { navigate } from 'gatsby';
import styled from 'styled-components';

import OrgContext from '../../../../utils/orgContext';
import ApiContext from '../../../../utils/apiContext';
import AuthContext from '../../../../utils/authContext';
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

  const { orgState } = useContext(OrgContext);
  const { id, stripe_customer_id, primary_email, subscription_id } = orgState;
  const { fetchFailure, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const { authState } = useContext(AuthContext);
  let token = authState?.user.jwt_token;
  const headers = { Authorization: `Bearer ${token}` };

  const [isModalSub, setModalSub] = useState(false);

  //stripe payment state
  const [subscriptionState, setSubscription] = useState();
  const [planType, setPlanType] = useState();
  const [price, setPrice] = useState();

  /* eslint-disable */
  useEffect(() => {
    if (stripe_customer_id && subscription_id) {
      getSubscription();
    }
  }, [orgState]);

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
    let params = { subscription_id };

    const subscription = await axios
      .get('/stripe/get-subscription', { params, headers })
      .catch((err) => {
        fetchFailure(err);
      });

    if (subscription.data.plan) setSubscription(subscription.data);
  };

  const cancelSubscription = async () => {
    setModalSub(false);
    let data = {
      email: primary_email,
      subscription_id,
      org_id: id
    };

    await axios.post('/stripe/cancel-subscription', data, { headers }).catch((err) => {
      fetchFailure(err);
    });

    setModalSub(false);
    message.success('Subscription Canceled');
    navigate('/user');
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

  const handleModal = () => {
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
          <React.Fragment>
            <PaymentInformationCard
              planType={planType}
              price={price}
              subscriptionState={subscriptionState}
            />
            <UpgradeSubscription subscriptionState={subscriptionState} />
            <CancelSubscriptionCard
              setModalSub={setModalSub}
              isModalSub={isModalSub}
              handleModal={handleModal}
              cancelSubscription={cancelSubscription}
            />
          </React.Fragment>
        )}
      </Wrapper>
    </React.Fragment>
  );
};

export default SubscriptionSettings;
