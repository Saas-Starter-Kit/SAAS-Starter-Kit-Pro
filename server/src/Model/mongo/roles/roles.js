import { Roles, Organizations } from '../../../Database/mongo/models.js';
import _ from 'lodash';

export const checkRoleExists = async (org_id, user_id) => {
  let role = await Roles.findOne({ org_id, user_id }).lean();
  return role;
};

export const getRoleModel = async (user_id, org_id) => {
  let org = await Organizations.findOne({ _id: org_id }).lean();
  let role = await Roles.findOne({ org_id, user_id }).lean();

  org = { ...org, id: org._id };

  return [_.merge(role, org)];
};

export const CreateOrgRole = async (org_id, user_id, role) => {
  let userRole = new Roles({ org_id, user_id, role });
  await userRole.save();
  return userRole;
};

export const deleteRoleModel = async (_id) => {
  console.log(_id);
  await Roles.findByIdAndDelete({ _id });
};
