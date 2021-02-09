import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';
import { Steps } from 'antd';
import {
  UserOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
  CloudUploadOutlined
} from '@ant-design/icons';

const { Step } = Steps;

const Plan = styled.div`
  border: 1px solid blue;
  padding: 2rem;
  background-color: ${(props) => (props.isActive ? 'lightblue' : 'white')};
  cursor: pointer;
  margin-bottom: 1rem;
  &:hover {
    background-color: lightblue;
    opacity: 85%;
  }
`;

const PlanHeader = styled.div`
  font-size: 1.2rem;
  font-weight: 900;
`;

const PlanPrice = styled.div`
  font-size: 0.9rem;
  font-weight: 900;
`;

const PurchaseHeader = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${colors.coolGray500};
  text-align: center;
`;

const PurchaseText = styled.div`
  font-size: 0.9rem;
  font-weight: 300;
  color: ${colors.coolGray500};
  text-align: center;
  padding-bottom: 1rem;
`;

const PlanSelect = ({ location }) => {
  const premium_plan = process.env.GATSBY_STRIPE_PREMIUM_PLAN;
  const basic_plan = process.env.GATSBY_STRIPE_BASIC_PLAN;

  const premium_price = process.env.GATSBY_STRIPE_PREMIUM_PLAN_PRICE;
  const basic_price = process.env.GATSBY_STRIPE_BASIC_PLAN_PRICE;

  const premium_type = process.env.GATSBY_STRIPE_PREMIUM_PLAN_TYPE;
  const basic_type = process.env.GATSBY_STRIPE_BASIC_PLAN_TYPE;

  const [plan, setPlan] = useState(basic_plan);
  const [planType, setPlanType] = useState(basic_type);
  const [price, setPrice] = useState(basic_price);
  const [isUpgradeFlow, setUpgradeFlow] = useState();
  const [currentPlan, setCurrentPlan] = useState();
  const [subscription_id, setSubscriptionId] = useState();
  const [subscription_item, setSubscriptionItem] = useState();
  console.log(location);

  useEffect(() => {
    if (location.state) {
      let isUpgradeFlow = location.state.isUpgradeFlow;
      let currentPlan = location.state.currentPlan;
      let subscription_id = location.state.subscription_id;
      let subscription_item = location.state.subscription_item;

      setUpgradeFlow(isUpgradeFlow);
      setCurrentPlan(currentPlan);
      setSubscriptionId(subscription_id);
      setSubscriptionItem(subscription_item);
    }
  }, [location]);

  useEffect(() => {
    if (isUpgradeFlow) {
      if (currentPlan == premium_plan) {
        selectPlan(premium_plan, premium_price, premium_type);
      } else if (currentPlan == basic_plan) {
        selectPlan(basic_plan, basic_price, basic_type);
      }
    }
  }, [isUpgradeFlow]);

  const selectPlan = (plan, price, type) => {
    setPlan(plan);
    setPrice(price);
    setPlanType(type);
  };

  return (
    <div>
      <PurchaseHeader>Buy SAAS Pro Now</PurchaseHeader>
      <PurchaseText>Main Benefit of product</PurchaseText>
      <Plan
        isActive={plan == basic_plan}
        onClick={() => selectPlan(basic_plan, basic_price, basic_type)}
      >
        <PlanHeader>Basic Plan</PlanHeader>
        {isUpgradeFlow && currentPlan == basic_plan && <div>Current Plan</div>}
        <PlanPrice>${basic_price}/month</PlanPrice>
      </Plan>
      <Plan
        isActive={plan == premium_plan}
        onClick={() => selectPlan(premium_plan, premium_price, premium_type)}
      >
        <PlanHeader>Premium Plan</PlanHeader>
        {isUpgradeFlow && currentPlan == premium_plan && <div>Current Plan</div>}
        <PlanPrice>${premium_price}/month</PlanPrice>
      </Plan>

      <Link
        disabled={plan == currentPlan}
        to="/purchase/payment"
        state={{ plan, price, planType, subscription_id, isUpgradeFlow, subscription_item }}
      >
        Submit
      </Link>
    </div>
  );
};

export default PlanSelect;
