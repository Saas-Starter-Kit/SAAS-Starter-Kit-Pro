import React from 'react';
import moment from 'moment';

import Card from '../../../../components/Common/Card';

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
        {subscriptionState.status === 'trialing' && (
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
