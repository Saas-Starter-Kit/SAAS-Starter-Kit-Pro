import { Organizations } from '../../../Database/mongo/models.js';

export const createSubscriptionModel = async (_id, subscription_id, plan_type) => {
  await Organizations.findOneAndUpdate({ _id }, { plan_type, subscription_id });
};

export const cancelSubscriptionModel = async (_id) => {
  await Organizations.findOneAndUpdate({ _id }, { subscription_id: null, plan_type: null });
};
