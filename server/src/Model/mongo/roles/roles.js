import { Roles, Apps } from '../../../Database/mongo/models.js';

export const checkRoleExists = async (app_id, user_id) => {
  Roles.findOne({ app_id, user_id });
};

export const getRoleModel = async (app_id, user_id) => {
  Apps.findOne({ app_id, user_id });
  Roles.findOne({ app_id, user_id });
};

export const postRoleModel = async (app_id, user_id, role) => {
  let role = new Roles({ app_id, user_id, role });

  console.log(role);
};

export const deleteRoleModel = async (role_id) => {
  Roles.findByIdAndDelete(role_id);
};
