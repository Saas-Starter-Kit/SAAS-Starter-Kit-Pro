import React, { useState, useContext, useEffect } from 'react';

import { navigate } from 'gatsby';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';

import LoadingOverlay from '../../../components/Common/loadingOverlay';
import styled from 'styled-components';

import CancelSubscriptionCard from './cancelSubscirptionCard';
import PaymentInformationCard from './paymentInformationCard';
import UpdateUsernameCard from './updateUsernameCard';
import UpdateEmailCard from './updateEmailCard';
import UpdatePaymentCard from './updatePaymentCard';
import AttachPaymentFormWrapper from './attachPaymentFormWrapper';
import UpdatePasswordCard from './updatePasswordCard';

import axios from '../../../services/axios';

const Wrapper = styled.div``;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const Settings = () => {
  const { firebase, authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;

  const curUser = firebase.auth().currentUser;

  const [isModalCard, setModalCard] = useState(false);
  const [isModalSub, setModalSub] = useState(false);

  //stripe payment state
  const [deletePaymentId, setDeletePaymentId] = useState();
  const [payCards, setPayCards] = useState([]);
  const [subscriptionState, setSubscription] = useState();
  const [paymentRemoved, setPaymentRemoved] = useState(false);

  //user state
  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [stripeCustomerId, setStripeId] = useState();
  const [isEmail, setIsEmail] = useState();

  useEffect(() => {
    if (authState.user) {
      setUser();
    }
  }, [authState]);

  useEffect(() => {
    if (stripeCustomerId) {
      getWallet();
    }
  }, [stripeCustomerId]);

  useEffect(() => {
    return () => fetchSuccess();
  }, []);

  /*
      Auth Methods
  */

  const setUser = () => {
    let userEmail = authState.user.email;
    let displayName = authState.user.username;
    let stripeCustomerId = authState.user.stripeCustomerKey;
    let id = authState.user.id;
    let isEmail = authState.user.provider === 'password';

    setId(id);
    setEmail(userEmail);
    setIsEmail(isEmail);
    setUsername(displayName);
    setStripeId(stripeCustomerId);
  };

  const updateUsername = async (event) => {
    event.preventDefault();
    fetchInit();

    const data = { id, username };

    await axios.put(`/auth/put/username`, data).catch((err) => {
      fetchFailure(err);
    });

    await curUser
      .updateProfile({
        displayName: username
      })
      .catch((err) => {
        fetchFailure(err);
      });

    navigate('/auth/login');
  };

  const updateEmail = async (event) => {
    event.preventDefault();
    fetchInit();

    const data = { id, email };
    await axios.put(`/auth/put/email`, data).catch((err) => {
      fetchFailure(err);
    });

    await curUser.updateEmail(email).catch((error) => {
      fetchFailure(error);
    });

    navigate('/auth/login');
  };

  /* 
      Stripe Methods
  */

  const deletePaymentMethod = async () => {
    setModalCard(false);
    let data = {
      payment: deletePaymentId
    };

    let wallet = await axios.post('/stripe/remove-payment', data).catch((err) => {
      fetchFailure(err);
    });

    console.log(wallet);
    //show ant d success message
    setPaymentRemoved(true);
  };

  const getWallet = async () => {
    let params = {
      customer: stripeCustomerId
    };

    let wallet = await axios.get('/stripe/get-wallet', { params }).catch((err) => {
      fetchFailure(err);
    });
    console.log(wallet);
    const cards = wallet.data.data;
    setPayCards(cards);
  };

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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleModalCardCancel = () => {
    setModalCard(false);
  };

  const handleModalSubCancel = () => {
    setModalSub(false);
  };

  return (
    <Wrapper>
      <Title>Account Settings</Title>
      {isLoading && <LoadingOverlay />}
      <UpdateUsernameCard
        isEmail={isEmail}
        handleUsernameChange={handleUsernameChange}
        username={username}
        updateUsername={updateUsername}
      />
      <UpdateEmailCard
        handleEmailChange={handleEmailChange}
        isEmail={isEmail}
        email={email}
        updateEmail={updateEmail}
      />
      <UpdatePasswordCard />
      <UpdatePaymentCard
        payCards={payCards}
        paymentRemoved={paymentRemoved}
        isModalCard={isModalCard}
        handleModalCardCancel={handleModalCardCancel}
        deletePaymentMethod={deletePaymentMethod}
        setDeletePaymentId={setDeletePaymentId}
        setModalCard={setModalCard}
      />
      <AttachPaymentFormWrapper />
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

export default Settings;
