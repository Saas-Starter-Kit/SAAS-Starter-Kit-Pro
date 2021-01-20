import React from 'react';
import { Button } from 'antd';
import moment from 'moment';
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

const UpgradeSubscription = ({ getSubscription, subscriptionState }) => {
  return (
    <Card>
      <h2>Payment Information</h2>
      <button onClick={getSubscription}>Retrieve Payment Information</button>
      {subscriptionState ? (
        <div>
          <div>Next Payment</div>
          <p>{moment(subscriptionState.current_period_end * 1000).format('MMM Do YYYY')}</p>
        </div>
      ) : (
        <div>No Subscription Found</div>
      )}
    </Card>
  );
};

export default UpgradeSubscription;
