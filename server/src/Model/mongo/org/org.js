import mongoose from 'mongoose';
const objectId = mongoose.Types.ObjectId;
import { Organizations, Roles, Todos } from '../../../Database/mongo/models.js';

export const CreateOrgModel = async (primary_email, org_name) => {
  let org = new Organizations({ primary_email, org_name });
  await org.save();

  return org._id;
};

export const GetOrgModel = async (user_id) => {
  let orgs = await Organizations.find({ user_id });
  let roles = await Roles.find({ user_id });

  return { ...orgs, ...roles };
};

export const SetOrgStripeId = async (stripe_customer_id, id) => {
  await Organizations.findByIdAndUpdate({ id }, { stripe_customer_id });
};

export const DeleteOrgModel = async (org_id) => {
  await Roles.findOneAndDelete({ org_id });
  await Todos.findOneAndDelete({ org_id });
  await Organizations.findByIdAndDelete({ id: org_id });
};

export const PutOrgModel = (id, org_name) => {
  await Organizations.findByIdAndUpdate({ id }, { org_name });
};
