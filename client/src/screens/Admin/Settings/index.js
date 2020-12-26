import React, { useState, useContext, useEffect } from 'react';

import { navigate } from 'gatsby';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';

import LoadingOverlay from '../../../components/Admin/Common/loadingOverlay';
import styled from 'styled-components';
import { colors, breakpoints, fieldStyles } from '../../../styles/theme';

import CancelSubscriptionCard from './cancelSubscirptionCard';
import PaymentInformationCard from './paymentInformationCard';
import UpdateUsernameCard from './updateUsernameCard';
import UpdateEmailCard from './updateEmailCard';
import UpdatePaymentCard from './updatePaymentCard';
import AttachPaymentFormWrapper from './attachPaymentFormWrapper';
import UpdatePasswordCard from './updatePasswordCard';

import ModalSubscriptionCancel from './cancelSubscriptionModal';
import axios from '../../../services/axios';

const Wrapper = styled.div``;

const Title = styled.h1`
  font-size: 1.5rem;
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

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  padding-top: 1.5rem;
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
  const [resPayMessage, setResPayMessage] = useState();
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

  /*
      Auth Methods
  */

  const setUser = () => {
    let userEmail = authState.user.email;
    let displayName = authState.user.username;
    let stripeCustomerId = authState.user.stripeCustomerKey;
    let id = authState.user.id.user;
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

    await curUser
      .updateProfile({
        displayName: username
      })
      .catch((err) => {
        fetchFailure(err);
      });

    const data = { id, username };

    await axios.put(`/auth/put/username`, data).catch((err) => {
      fetchFailure(err);
    });

    fetchSuccess();
    navigate('/login');
  };

  const updateEmail = async (event) => {
    event.preventDefault();
    fetchInit();

    await curUser.updateEmail(email).catch(function (error) {
      fetchFailure(error);
    });

    const data = { id, email };

    await axios.put(`/auth/put/email`, data).catch((err) => {
      fetchFailure(err);
    });

    fetchSuccess();
    navigate('/login');
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

    //replace with antd success message
    setResPayMessage(subscriptionCancel.data);
    setModalSub(false);
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
