import React, { useState, useContext, useEffect } from 'react';

import AuthContext from '../../../../utils/authContext';
import ApiContext from '../../../../utils/apiContext';

import LoadingOverlay from '../../../../components/Common/loadingOverlay';
import styled from 'styled-components';

import UpdatePaymentCard from './updatePaymentCard';
import AttachPaymentFormWrapper from './attachPaymentFormWrapper';

import axios from '../../../../services/axios';

const Wrapper = styled.div``;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const PaymentSettings = () => {
  const { firebase, authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;

  const [isModalCard, setModalCard] = useState(false);

  //stripe payment state
  const [deletePaymentId, setDeletePaymentId] = useState();
  const [payCards, setPayCards] = useState([]);
  const [paymentRemoved, setPaymentRemoved] = useState(false);

  //user state
  const [id, setId] = useState();
  const [stripeCustomerId, setStripeId] = useState();

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
    let stripeCustomerId = authState.user.stripeCustomerKey;
    let id = authState.user.id;

    setId(id);

    setStripeId(stripeCustomerId);
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

  /* 
      Helper Methods
  */

  const handleModalCardCancel = () => {
    setModalCard(false);
  };

  return (
    <Wrapper>
      <Title>Account Settings</Title>
      {isLoading && <LoadingOverlay />}
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
    </Wrapper>
  );
};

export default PaymentSettings;
