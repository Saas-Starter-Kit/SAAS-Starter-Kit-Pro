import { Roles, Organizations } from '../../../Database/mongo/models.js';
import mongoose from 'mongoose';
const objectId = mongoose.Types.ObjectId;

export const checkRoleExists = async (org_id, user_id) => {
  let role = await Roles.findOne({ org_id: objectId(org_id), user_id: objectId(user_id) }).lean();
  return role;
};

export const getRoleModel = async (user_id, org_id) => {
  let org = await Organizations.find({ id: org_id, user_id });
  let role = await Roles.find({ org_id, user_id });

  return { role, org };
};

export const CreateOrgRole = async (org_id, user_id, role) => {
  let userRole = new Roles({ org_id: objectId(org_id), user_id: objectId(user_id), role });
  await userRole.save();
  return userRole;
};

export const deleteRoleModel = async (role_id) => {
  await Roles.findByIdAndDelete({ id: objectId(role_id) });
};
