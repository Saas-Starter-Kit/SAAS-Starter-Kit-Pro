import React, { useState, useContext, useEffect } from 'react';

import { navigate } from 'gatsby';
import moment from 'moment';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';

import LoadingOverlay from '../../../components/Admin/Common/loadingOverlay';
import styled from 'styled-components';
import { colors, breakpoints, fieldStyles } from '../../../styles/theme';

import UpdateUsernameCard from './updateUsernameCard';
import UpdateEmailCard from './updateEmailCard';
import AttachPaymentFormWrapper from './attachPaymentFormWrapper';

import ModalCardDelete from './deleteCardConfirmModal';
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

const Paragraph = styled.p`
  font-weight: 700;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  padding-top: 1.5rem;
`;

const Form = styled.form`
  padding-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.gray700};
`;

const Input = styled.input`
  ${fieldStyles}
`;

const Button = styled.button`
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  border-radius: 0.375rem;
  color: ${colors.white};
  cursor: pointer;
  background-color: ${colors.indigo600};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  &:hover {
    background-color: ${colors.indigo500};
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
  }
  &:active {
    background-color: ${colors.indigo600};
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

const StyledCardDisplayWrapper = styled.div`
  border: 1px solid black;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 1rem;
`;

const StyledCardDisplay = styled.div`
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin: 1rem;
`;

const DangerButton = styled.button`
  background-color: red;
  color: white;
  padding: 0.4rem 0.8rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-left: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const CancelSubscriptionButton = styled.button`
  background-color: red;
  color: white;
  padding: 0.6rem 1.2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
  cursor: pointer;
`;

const SuccessResponse = styled.div`
  font-size: 0.9rem;
  color: green;
  font-weight: 100;
`;

const Settings = () => {
  const { firebase, authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;

  const curUser = firebase.auth().currentUser;

  const [isModalCard, setModalCard] = useState(false);
  const [isModalSub, setModalSub] = useState(false);

  const [deletePaymentId, setDeletePaymentId] = useState();
  const [resPayMessage, setResPayMessage] = useState();
  const [payCards, setPayCards] = useState([]);
  const [subscriptionState, setSubscription] = useState();
  const [paymentRemoved, setPaymentRemoved] = useState(false);

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

    navigate('/login');
  };

  /* 
      Stripe Methods
  */

  const deletePaymentMethod = async (id) => {
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

      <Card>
        <SectionTitle>Update Password</SectionTitle>
        <p>Please Reset Password on Login Page</p>
        <Button
          onClick={() => {
            navigate('/login');
          }}
        >
          Go to Login
        </Button>
      </Card>

      <Card>
        <Title>Billing Settings</Title>
        {isLoading && <LoadingOverlay />}
        <Paragraph>{resPayMessage}</Paragraph>

        <SectionTitle>Update Payment</SectionTitle>
        {!paymentRemoved ? (
          payCards.map((item) => (
            <StyledCardDisplayWrapper>
              <StyledCardDisplay key={item.id}>
                {item.card.brand} **** **** **** {item.card.last4} expires {item.card.exp_month}/
                {item.card.exp_year}
              </StyledCardDisplay>
              <DangerButton
                onClick={() => {
                  setDeletePaymentId(item.id);
                  setModalCard(true);
                }}
              >
                Remove Card
              </DangerButton>
            </StyledCardDisplayWrapper>
          ))
        ) : (
          <SuccessResponse>Payment Removed Successfully</SuccessResponse>
        )}
        <ModalCardDelete
          isModalCard={isModalCard}
          handleModalCardCancel={handleModalCardCancel}
          deletePaymentMethod={deletePaymentMethod}
        />
        <SectionTitle>Manage Subscription</SectionTitle>
        <CancelSubscriptionButton onClick={() => setModalSub(true)}>
          Cancel Subscription
        </CancelSubscriptionButton>
        <ModalSubscriptionCancel
          isModalSub={isModalSub}
          handleModalSubCancel={handleModalSubCancel}
          cancelSubscription={cancelSubscription}
        />
      </Card>

      <AttachPaymentFormWrapper />

      <Card>
        <h2>Payment Information</h2>
        <button onClick={getSubscription}>Retrieve Payment Information</button>
        {subscriptionState && (
          <div>
            <div>Next Payment</div>
            <p>{moment(subscriptionState.current_period_end * 1000).format('MMM Do YYYY')}</p>
          </div>
        )}
      </Card>
    </Wrapper>
  );
};

export default Settings;
