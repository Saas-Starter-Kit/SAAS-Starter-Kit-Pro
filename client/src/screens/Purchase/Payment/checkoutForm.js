import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import { FaRegCreditCard } from 'react-icons/fa';
import { Spin } from 'antd';

import OrgContext from '../../../utils/orgContext';
import ApiContext from '../../../utils/apiContext';
import AuthContext from '../../../utils/authContext';
import axios from '../../../services/axios';
import { colors, breakpoints } from '../../../styles/theme';

import Button from '../../../components/Common/buttons/PrimaryButton';
import Card from '../../../components/Common/Card';

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

const PaymentConfirmRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0 0.3rem 0;
`;

const StyledHr = styled.hr`
  background-color: black;
  height: 2px;
`;

const CheckoutForm = () => {
  const location = useRouter();
  const { orgState } = useContext(OrgContext);
  const { id, stripe_customer_id, primary_email, org_name } = orgState;
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const { authState } = useContext(AuthContext);
  let token = authState?.user.jwt_token;
  const headers = { Authorization: `Bearer ${token}` };

  const [plan, setPlan] = useState();
  const [price, setPrice] = useState();
  const [planType, setPlanType] = useState();

  const [isUpgradeFlow, setUpgradeFlow] = useState();
  const [subscription_id, setSubId] = useState();
  const [subscription_item, setSubItem] = useState();

  const [paymentMethod, setPaymentMethod] = useState();
  const [payCards, setPayCards] = useState([]);

  const stripe = useStripe();
  const elements = useElements();

  /* eslint-disable */

  useEffect(() => {
    if (!location.isReady) return;

    setPlan(location.query?.plan);
    setPrice(location.query?.price);
    setPlanType(location.query?.planType);

    setUpgradeFlow(location.query?.isUpgradeFlow);
    setSubId(location.query?.subscription_id);
    setSubItem(location.query?.subscription_item);

    // TODO: Need to remove the console.log
    console.log(location);
  }, [location.isReady]);

  useEffect(() => {
    return () => fetchSuccess();
  }, []);

  useEffect(() => {
    if (stripe_customer_id) getWallet();
  }, [orgState]);
  /* eslint-enable */

  const getWallet = async () => {
    fetchInit();
    //get customers list of available payment methods
    let params = {
      customer: stripe_customer_id
    };

    let wallet = await axios.get('/stripe/get-wallet', { params }).catch((err) => {
      fetchFailure(err);
    });

    const cards = wallet.data.data;
    setPayCards(cards);

    fetchSuccess();
  };

  const addPaymentMethod = async (event) => {
    event.preventDefault();
    fetchInit();

    let data = { customer: stripe_customer_id };
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
        return <CardBrandImage src="/credit card icons/visa.png" alt="Visa logo" />;
      case 'amex':
        return (
          <CardBrandImage
            src="/credit card icons/american_express.png"
            alt="American Express logo"
          />
        );
      case 'discover':
        return <CardBrandImage src="/credit card icons/discover.png" alt="Discover logo" />;
      case 'mastercard':
        return <CardBrandImage src="/credit card icons/mastercard.png" alt="Mastercard logo" />;
      default:
        return <FaRegCreditCard />;
    }
  };

  const updateSubscription = async () => {
    fetchInit();

    let planSelect = plan;
    let payment_method = paymentMethod;
    let email = primary_email;

    let data = { subscription_id, planSelect, payment_method, subscription_item, planType, email };

    await axios.put('/stripe/update-subscription', data, { headers }).catch((err) => {
      fetchFailure(err);
    });

    location.push('/purchase/confirm');
  };

  const createSubscription = async () => {
    fetchInit();

    let payment_method = paymentMethod;
    let customer = stripe_customer_id;
    let planSelect = plan;
    let org_id = id;
    let email = primary_email;

    let data = { payment_method, customer, email, planSelect, org_id, planType };

    //create subscription
    let result = await axios.post('/stripe/create-subscription', data, { headers }).catch((err) => {
      fetchFailure(err);
    });

    if (result.data.status === 'active' || result.data.status === 'trialing') {
      location.push('/purchase/confirm');
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
          <h2>Purchasing Subscription for {org_name}</h2>
          <h3>Please Choose Payment Method</h3>
          {payCards.length !== 0 ? (
            payCards.map((item) => (
              <StyledCardDisplayWrapper key={item.id}>
                <StyledCardDisplay
                  isActive={item.id === paymentMethod}
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

      <Spin tip="Loading" spinning={isLoading}>
        <PaymentConfirm>
          <h3>
            {isUpgradeFlow ? <span>Changing to</span> : <span>Purchasing</span>} {planType} Plan
          </h3>

          <PaymentConfirmRow>
            <div>{planType}</div>
            <div>
              <strong>${price}/month</strong>
            </div>
          </PaymentConfirmRow>
          <StyledHr />
          <PaymentConfirmRow>
            <div>
              <strong>Subtotal</strong>
            </div>
            <div>${price}</div>
          </PaymentConfirmRow>
          <Button
            disabled={!paymentMethod}
            onClick={isUpgradeFlow ? updateSubscription : createSubscription}
          >
            Confirm
          </Button>
        </PaymentConfirm>
      </Spin>
    </Wrapper>
  );
};

export default CheckoutForm;
