import db from '../../../Database/sql/db.js';

export const createSubscriptionModel = async (org_id, subscriptionId, planType) => {
  let text = `UPDATE organization SET subscription_id=$2, plan_type=$3
              WHERE id = $1`;
  let values = [org_id, subscriptionId, planType];

  await db.query(text, values);

  return;
};

export const cancelSubscriptionModel = async (org_id) => {
  let text = `UPDATE organization SET subscription_id=$1, plan_type=$2
              WHERE id=$3`;
  let values = [null, null, org_id];

  await db.query(text, values);

  return;
};
