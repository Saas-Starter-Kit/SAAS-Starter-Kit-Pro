import { Roles, Apps } from '../../../Database/mongo/models.js';

export const checkRoleExists = async (app_id, user_id) => {
  let role = Roles.findOne({ app_id, user_id });
  return role;
};

export const getRoleModel = async (app_id, user_id) => {
  let apps = Apps.findOne({ app_id, user_id });
  let roles = Roles.findOne({ app_id, user_id });

  console.log(apps, roles);
  return { apps, roles };
};

export const postRoleModel = async (app_id, user_id, role) => {
  let role = new Roles({ app_id, user_id, role });

  console.log(role);
};

export const deleteRoleModel = async (role_id) => {
  Roles.findByIdAndDelete(role_id);
};
