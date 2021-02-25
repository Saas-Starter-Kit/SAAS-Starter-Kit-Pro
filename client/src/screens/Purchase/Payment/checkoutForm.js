import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation } from '@reach/router';
import { FaRegCreditCard } from 'react-icons/fa';
import { navigate } from 'gatsby';
import { Spin } from 'antd';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import axios from '../../../services/axios';
import { colors, breakpoints } from '../../../styles/theme';

import Button from '../../../components/Common/buttons/PrimaryButton';
import Card from '../../../components/Common/Card';
import LoadingOverlay from '../../../components/Common/loadingOverlay';
import visa from '../../../assets/images/credit card icons/visa.png';
import discover from '../../../assets/images/credit card icons/discover.png';
import mastercard from '../../../assets/images/credit card icons/mastercard.png';
import american_express from '../../../assets/images/credit card icons/american_express.png';

const Wrapper = styled.div`
  display: flex;
  background-color: ${colors.gray50};
  min-height: 100vh;
  margin-top: 2rem;

  @media (max-width: ${breakpoints.small}) {
    flex-direction: column;
    align-items: center;
  }
`;

const PaymentConfirm = styled.div`
  background-color: white;
  width: 30%;
  margin-right: 2rem;
  margin-left: 1rem;
  height: max-content;
  padding: 1rem;
  padding-bottom: 2rem;
  @media (max-width: ${breakpoints.small}) {
    flex-direction: column;
    margin: 1rem;
    width: 90%;
  }
`;

const PaymentInfo = styled.div`
  background-color: white;
  margin-left: 2rem;
  margin-right: 1rem;
  width: 70%;
  height: max-content;
  padding: 1rem;
  @media (max-width: ${breakpoints.small}) {
    margin: 1rem;
    width: 90%;
  }
`;

const ButtonWrapper = styled.div`
  padding-top: 2rem;
  padding-bottom: 1rem;
  background-color: ${colors.white};
  text-align: left;
`;

const StyledCardDisplayWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 1rem;
`;

const StyledCardDisplay = styled.div`
  font-size: 1.075rem;
  border-radius: 1rem;
  padding: 0.5rem;
  background-color: darkblue;
  color: white;
  font-weight: 500;
  width: 14rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin: 1rem;
  cursor: pointer;
  border: ${(props) => (props.isActive ? '4px solid lightblue' : null)};
`;

const CardNumber = styled.div`
  font-size: 1.3rem;
  padding-left: 0.5rem;
`;

const Expires = styled.div`
  padding-left: 0.5rem;
`;

const SecondCardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardBrandImage = styled.img`
  padding-right: 0.5rem;
`;

const CheckoutForm = () => {
  const location = useLocation();
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [plan, setPlan] = useState();
  const [price, setPrice] = useState();
  const [planType, setPlanType] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [payCards, setPayCards] = useState([]);
  const [isUpgradeFlow, setUpgradeFlow] = useState();
  const [subscription_id, setSubscriptionId] = useState();
  const [subscription_item, setSubscriptionItem] = useState();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (location.state) {
      let Plan = location.state.plan;
      let Price = location.state.price;
      let PlanType = location.state.planType;
      let isUpgradeFlow = location.state.isUpgradeFlow;
      let subscription_id = location.state.subscription_id;
      let subscription_item = location.state.subscription_item;

      setUpgradeFlow(isUpgradeFlow);
      setSubscriptionItem(subscription_item);
      setSubscriptionId(subscription_id);
      setPlan(Plan);
      setPrice(Price);
      setPlanType(PlanType);
    } else {
      navigate('/purchase/plan');
    }
  }, [location]);

  useEffect(() => {
    return () => fetchSuccess();
  }, []);

  useEffect(() => {
    if (authState.user) getWallet();
  }, [authState]);

  const getWallet = async () => {
    fetchInit();
    //get customers list of available payment methods
    let params = {
      customer: authState.user.stripeCustomerKey
    };

    let wallet = await axios.get('/stripe/get-wallet', { params }).catch((err) => {
      fetchFailure(err);
    });

    const cards = wallet.data.data;
    setPayCards(cards);
    setIcons(cards);
    fetchSuccess();
  };

  const addPaymentMethod = async (event) => {
    event.preventDefault();
    fetchInit();

    let data = { customer: authState.user };
    //get stripe client secret
    const result = await axios.post('/stripe/wallet', data).catch((err) => {
      fetchFailure(err);
    });

    const cardElement = elements.getElement(CardElement);

    //validate customer card
    const { setupIntent, error } = await stripe
      .confirmCardSetup(result.data.client_secret, {
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

    getWallet();
    setPaymentMethod(setupIntent.payment_method);
    fetchSuccess();
  };

  const setIcons = (brand) => {
    switch (brand) {
      case 'visa':
        return <CardBrandImage src={visa} alt="" />;
      case 'amex':
        return <CardBrandImage src={american_express} alt="" />;
      case 'discover':
        return <CardBrandImage src={discover} alt="" />;
      case 'mastercard':
        return <CardBrandImage src={mastercard} alt="" />;
      default:
        return <FaRegCreditCard />;
    }
  };

  const updateSubscription = async () => {
    fetchInit();

    let subscriptionId = subscription_id;
    let planSelect = plan;
    let payment_method = paymentMethod;
    let subscriptionItem = subscription_item;
    let email = authState.user.email;

    let data = { subscriptionId, planSelect, payment_method, subscriptionItem, planType, email };

    await axios.put('/stripe/update-subscription', data).catch((err) => {
      fetchFailure(err);
    });

    navigate('/purchase/confirm');
  };

  const createSubscription = async () => {
    fetchInit();

    let payment_method = paymentMethod;
    let customer = authState.user;
    let planSelect = plan;

    let data = { payment_method, customer, planSelect };

    //create subscription
    let result = await axios.post('/stripe/create-subscription', data).catch((err) => {
      fetchFailure(err);
    });

    if (result.data.status === 'active' || result.data.status === 'trialing') {
      navigate('/purchase/confirm');
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
      <PaymentInfo>
        <Spin tip="Loading" spinning={isLoading}>
          <h2>Please Choose Payment Method</h2>
          {!payCards.length == 0 ? (
            payCards.map((item) => (
              <StyledCardDisplayWrapper key={item.id}>
                <StyledCardDisplay
                  isActive={item.id == paymentMethod}
                  onClick={() => setPaymentMethod(item.id)}
                >
                  <CardNumber>**** **** **** {item.card.last4}</CardNumber>
                  <SecondCardRow>
                    <Expires>
                      {item.card.exp_month}/{item.card.exp_year.toString().slice(-2)}
                    </Expires>
                    {setIcons(item.card.brand)}
                  </SecondCardRow>
                </StyledCardDisplay>
              </StyledCardDisplayWrapper>
            ))
          ) : (
            <div>
              <p>No Payment Methods Found</p>
            </div>
          )}
        </Spin>

        <Spin tip="Loading" spinning={isLoading}>
          <Card>
            <form onSubmit={addPaymentMethod}>
              <CardElement />
              <ButtonWrapper>
                <Button type="submit" disabled={!stripe}>
                  Add Card
                </Button>
              </ButtonWrapper>
            </form>
          </Card>
        </Spin>
      </PaymentInfo>

      <PaymentConfirm>
        <Spin tip="Loading" spinning={isLoading}>
          <h3>
            {isUpgradeFlow ? <span>Changing to</span> : <span>Purchasing</span>} {planType} Plan
          </h3>
          <p>${price}/month </p>
          <Button
            disabled={!paymentMethod}
            onClick={isUpgradeFlow ? updateSubscription : createSubscription}
          >
            Confirm
          </Button>
        </Spin>
      </PaymentConfirm>
    </Wrapper>
  );
};

export default CheckoutForm;
