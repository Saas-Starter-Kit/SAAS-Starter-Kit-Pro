import React from 'react';
import { Link } from 'gatsby';

import Card from '../../../../components/Common/Card';
import Button from '../../../../components/Common/buttons/PrimaryButton';

const UpgradeSubscription = ({ subscriptionState }) => {
  const subscription_id = subscriptionState.id;
  const currentPlan = subscriptionState.plan.id;
  const subscription_item = subscriptionState.items.data[0].id;
  const isUpgradeFlow = true;

  return (
    <Card>
      <h2>Click Here to change plans</h2>
      <Link
        to="/purchase/plan"
        state={{ subscription_id, currentPlan, isUpgradeFlow, subscription_item }}
      >
        <Button>Submit</Button>
      </Link>
    </Card>
  );
};

export default UpgradeSubscription;
