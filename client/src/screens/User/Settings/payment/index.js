import React, { useState, useContext, useEffect } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

import AuthContext from '../../../../utils/authContext';
import ApiContext from '../../../../utils/apiContext';
import axios from '../../../../services/axios';

import SettingsHeader from '../../../../components/User/Navigation/settingsHeader';
import UpdatePaymentCard from './updatePaymentCard';
import AttachPaymentFormWrapper from './attachPaymentFormWrapper';

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
    fetchInit();
    let params = {
      customer: stripeCustomerId
    };

    let wallet = await axios.get('/stripe/get-wallet', { params }).catch((err) => {
      fetchFailure(err);
    });
    console.log(wallet);
    const cards = wallet.data.data;
    setPayCards(cards);
    fetchSuccess();
  };

  /* 
      Helper Methods
  */

  const handleModalCardCancel = () => {
    setModalCard(false);
  };

  return (
    <Wrapper>
      <SettingsHeader />

      <Title>Payment Settings</Title>
      <Spin tip="Loading..." spinning={isLoading}>
        <UpdatePaymentCard
          payCards={payCards}
          paymentRemoved={paymentRemoved}
          isModalCard={isModalCard}
          handleModalCardCancel={handleModalCardCancel}
          deletePaymentMethod={deletePaymentMethod}
          setDeletePaymentId={setDeletePaymentId}
          setModalCard={setModalCard}
        />
      </Spin>
      <AttachPaymentFormWrapper />
    </Wrapper>
  );
};

export default PaymentSettings;
