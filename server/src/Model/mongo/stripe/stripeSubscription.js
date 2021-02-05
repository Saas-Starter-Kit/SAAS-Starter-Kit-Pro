import { Users } from '../../../Database/mongo/db.js';

export const createSubscriptionModel = (email, subscriptionId) => {
  Users.findOneAndUpdate({ email }, { is_paid_member: true, subscription_id: subscriptionId });
};

export const cancelSubscriptionModel = (email) => {
  Users.findOneAndUpdate({ email }, { is_paid_member: false, subscription_id: '' });
};
