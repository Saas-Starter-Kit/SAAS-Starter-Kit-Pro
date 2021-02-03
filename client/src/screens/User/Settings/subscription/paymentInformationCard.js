import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { colors, breakpoints, fieldStyles } from '../../../../styles/theme';
import { Link } from 'gatsby';

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

const PaymentInformationCard = ({ subscriptionState, price, planType }) => {
  return (
    <Card>
      <h2>Payment Information</h2>
      <div>
        <div>Current Plan</div>
        <p>
          {planType} Plan at ${price}/month
        </p>
        <div>Billing Period Start</div>
        <p>{moment(subscriptionState.current_period_start * 1000).format('MMM Do YYYY')}</p>
        <div>Next Payment</div>
        <p>{moment(subscriptionState.current_period_end * 1000).format('MMM Do YYYY')}</p>
        <div>Member Since</div>
        <p>{moment(subscriptionState.created * 1000).format('MMM Do YYYY')}</p>
        {subscriptionState.status == 'trialing' && (
          <div>
            <div>Trial start</div>
            <p>{moment(subscriptionState.trial_start * 1000).format('MMM Do YYYY')}</p>
            <div>Trial End</div>
            <p>{moment(subscriptionState.trial_end * 1000).format('MMM Do YYYY')}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PaymentInformationCard;
