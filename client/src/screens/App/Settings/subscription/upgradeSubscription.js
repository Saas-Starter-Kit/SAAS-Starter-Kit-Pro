import React from 'react';
import Link from 'next/link';

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
        href="/purchase/plan"
        state={{ subscription_id, currentPlan, isUpgradeFlow, subscription_item }}
      >
        <a>
          <Button>Submit</Button>
        </a>
      </Link>
    </Card>
  );
};

export default UpgradeSubscription;
