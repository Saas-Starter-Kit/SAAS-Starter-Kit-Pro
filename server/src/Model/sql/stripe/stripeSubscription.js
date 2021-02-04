import db from '../../../Database/db.js';

export const createSubscriptionModel = async (email, subscriptionId) => {
  let text = `UPDATE users SET is_paid_member=$1, subscription_id=$3
                WHERE email = $2`;
  let values = ['true', email, subscriptionId];

  await db.query(text, values);

  return;
};

export const cancelSubscriptionModel = async (email) => {
  let text = `UPDATE users SET is_paid_member=$1, subscription_id=$2
               WHERE email=$3`;
  let values = ['false', '', email];

  await db.query(text, values);
};
