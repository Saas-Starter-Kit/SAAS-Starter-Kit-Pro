import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { colors, breakpoints, fieldStyles } from '../../../../styles/theme';

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

const UpgradeSubscription = ({ subscriptionState }) => {
  console.log(subscriptionState);
  const subscription_id = subscriptionState.id;
  const currentPlan = subscriptionState.plan.id;
  const subscription_item = subscriptionState.items.data[0].id;
  const isUpgradeFlow = true;

  return (
    <Card>
      <div>Click Here to change plans</div>
      <Link
        to="/purchase/plan"
        state={{ subscription_id, currentPlan, isUpgradeFlow, subscription_item }}
      >
        Submit
      </Link>
    </Card>
  );
};

export default UpgradeSubscription;
