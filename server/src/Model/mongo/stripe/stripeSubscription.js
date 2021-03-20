import { Organizations } from '../../../Database/mongo/models.js';

export const createSubscriptionModel = async (org_id, subscription_id, plan_type) => {
  return await Organizations.findOneAndUpdate({ _id: org_id }, { plan_type, subscription_id });
};

export const cancelSubscriptionModel = async (org_id) => {
  await Users.findOneAndUpdate({ _id: org_id }, { subscription_id: null, plan_type: null });
};
