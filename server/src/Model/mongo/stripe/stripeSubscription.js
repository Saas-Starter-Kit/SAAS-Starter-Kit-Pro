import { Users } from '../../../Database/mongo/models.js';

export const createSubscriptionModel = async (email, subscription_id) => {
  return await Users.findOneAndUpdate({ email },
    { $set: { is_paid_member: true, subscription_id: subscription_id } }, { new: true }
  );
};

export const cancelSubscriptionModel = async (email) => {
  return await Users.findOneAndUpdate({ email },
    { $set: { is_paid_member: false, subscription_id: '' } }, { new: true });
};
