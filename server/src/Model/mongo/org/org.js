import { Organizations, Roles, Todos } from '../../../Database/mongo/models.js';
import _ from 'lodash';

export const CreateOrgModel = async (primary_email, org_name) => {
  let org = new Organizations({ primary_email, org_name });
  await org.save();

  return org.id;
};

export const GetOrgModel = async (user_id) => {
  // get org roles user is associated with
  let roles = await Roles.find({ user_id }).lean();

  //create array with org ids
  let OrgIds = roles.map((item) => item.org_id);

  //find orgs with matching role ids and add id property
  let orgs = await Organizations.find({ _id: { $in: OrgIds } }).lean();
  orgs = orgs.map((item) => ({ ...item, id: item._id }));

  let OrgsRolesArr = [];

  //merge roles and orgs
  orgs.map((item, index) => OrgsRolesArr.push(_.merge(orgs[index], roles[index])));

  return [...OrgsRolesArr];
};

export const SetOrgStripeId = async (stripe_customer_id, _id) => {
  await Organizations.findByIdAndUpdate({ _id }, { stripe_customer_id });
};

export const DeleteOrgModel = async (org_id) => {
  await Roles.findOneAndDelete({ org_id });
  await Todos.findOneAndDelete({ org_id });
  await Organizations.findByIdAndDelete({ _id: org_id });
};

export const PutOrgModel = async (_id, org_name) => {
  await Organizations.findByIdAndUpdate({ _id }, { org_name });
};
