import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { colors } from '../../../../styles/theme';
import { Steps } from 'antd';
import {
  UserOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CreditCardOutlined
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

const PlanSelect = () => {
  const premium_plan = process.env.GATSBY_STRIPE_PREMIUM_PLAN;
  const basic_plan = process.env.GATSBY_STRIPE_BASIC_PLAN;

  const premium_price = process.env.GATSBY_STRIPE_PREMIUM_PLAN_PRICE;
  const basic_price = process.env.GATSBY_STRIPE_BASIC_PLAN_PRICE;

  const [plan, setPlan] = useState(basic_plan);
  const [planType, setPlanType] = useState('Basic');
  const [price, setPrice] = useState(basic_price);

  const selectPlan = (plan, price, type) => {
    setPlan(plan);
    setPrice(price);
    setPlanType(type);
  };

  return (
    <div>
      <div style={{ width: '80%' }}>
        <Steps>
          <Step status="finish" title="Login" icon={<UserOutlined />} />
          <Step status="process" title="Plan" icon={<LoadingOutlined />} />
          <Step status="wait" title="Payment" icon={<CreditCardOutlined />} />
          <Step status="wait" title="Done" icon={<CheckCircleOutlined />} />
        </Steps>
      </div>
      <PurchaseHeader>Buy SAAS Pro Now</PurchaseHeader>
      <PurchaseText>Main Benefit of product</PurchaseText>
      <Plan onClick={() => selectPlan(basic_plan, basic_price, 'Basic')}>
        <PlanHeader>Basic Plan</PlanHeader>
        <PlanPrice>${basic_price}/month</PlanPrice>
      </Plan>
      <Plan onClick={() => selectPlan(premium_plan, premium_price, 'Premium')}>
        <PlanHeader>Premium Plan</PlanHeader>
        <PlanPrice>${premium_price}/month</PlanPrice>
      </Plan>

      <Link to="/purchase/payment" state={{ plan, price, planType }}>
        Submit
      </Link>
    </div>
  );
};

export default PlanSelect;
