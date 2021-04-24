import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import OrgContext from '../../../utils/orgContext';

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: ${breakpoints.small}) {
    flex-direction: column;
    align-items: center;
  }
`;

const FeaturesWrapper = styled.div`
  margin-top: 1rem;
  padding: 0.2rem;
`;

const Feature = styled.div`
  padding-bottom: 0.2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const PlanButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
  font-weight: 500;
  width: 11rem;
  background-color: blue;
  color: white;
  cursor: pointer;
`;

const PlanCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16rem;
  padding: 2rem;
  background-color: white;
  border: ${(props) => (props.isActive ? 'solid 1px black' : '')};
  cursor: pointer;
  margin-bottom: 1rem;
  border-radius: 0.3rem;
  &:hover {
    border: solid 1px black;
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

const PurchaseHeader = styled.h1`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${colors.coolGray700};
  text-align: center;
`;

const PurchaseText = styled.div`
  font-size: 1.075rem;
  font-weight: 500;
  color: ${colors.coolGray700};
  text-align: center;
  padding-bottom: 1rem;
`;

const PlanSelect = () => {
  const location = useRouter();
  const premium_plan = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PLAN;
  const basic_plan = process.env.NEXT_PUBLIC_STRIPE_BASIC_PLAN;

  const premium_price = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_PRICE;
  const basic_price = process.env.NEXT_PUBLIC_STRIPE_BASIC_PLAN_PRICE;

  const premium_type = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_TYPE;
  const basic_type = process.env.NEXT_PUBLIC_STRIPE_BASIC_PLAN_TYPE;

  const { orgState } = useContext(OrgContext);
  const { org_name } = orgState;

  const [plan, setPlan] = useState(basic_plan);
  const [planType, setPlanType] = useState(basic_type);
  const [price, setPrice] = useState(basic_price);

  let isUpgradeFlow = location.state?.isUpgradeFlow;
  let currentPlan = location.state?.currentPlan;
  let subscription_id = location.state?.subscription_id;
  let subscription_item = location.state?.subscription_item;

  /* eslint-disable */

  useEffect(() => {
    if (isUpgradeFlow) {
      if (currentPlan == premium_plan) {
        selectPlan(premium_plan, premium_price, premium_type);
      } else if (currentPlan == basic_plan) {
        selectPlan(basic_plan, basic_price, basic_type);
      }
    }
  }, [isUpgradeFlow]);
  /* eslint-enable */

  const selectPlan = (plan, price, type) => {
    setPlan(plan);
    setPrice(price);
    setPlanType(type);
  };

  return (
    <div>
      <PurchaseHeader>Purchasing SAAS Pro </PurchaseHeader>
      <PurchaseText>for {org_name}</PurchaseText>
      <CardsWrapper>
        <PlanCard
          isActive={plan === basic_plan}
          onClick={() => selectPlan(basic_plan, basic_price, basic_type)}
        >
          <PlanHeader>Basic Plan</PlanHeader>
          {isUpgradeFlow && currentPlan === basic_plan && <div>Current Plan</div>}
          <PlanPrice>${basic_price}/month</PlanPrice>
          <FeaturesWrapper>
            <Feature>Feature 1</Feature>
            <hr />
            <Feature>Feature 2</Feature>
            <hr />
            <Feature>Feature 3</Feature>
            <hr />
          </FeaturesWrapper>
        </PlanCard>
        <PlanCard
          isActive={plan === premium_plan}
          onClick={() => selectPlan(premium_plan, premium_price, premium_type)}
        >
          <PlanHeader>Premium Plan</PlanHeader>
          {isUpgradeFlow && currentPlan === premium_plan && <div>Current Plan</div>}
          <PlanPrice>${premium_price}/month</PlanPrice>
          <FeaturesWrapper>
            <Feature>Feature 1</Feature>
            <hr />
            <Feature>Feature 2</Feature>
            <hr />
            <Feature>Feature 3</Feature>
            <hr />
          </FeaturesWrapper>
        </PlanCard>
      </CardsWrapper>
      <ButtonWrapper>
        <Link
          disabled={plan === currentPlan}
          href="/purchase/payment"
          state={{ plan, price, planType, subscription_id, isUpgradeFlow, subscription_item }}
        >
          <a>
            <PlanButton>Submit</PlanButton>
          </a>
        </Link>
      </ButtonWrapper>
    </div>
  );
};

export default PlanSelect;
