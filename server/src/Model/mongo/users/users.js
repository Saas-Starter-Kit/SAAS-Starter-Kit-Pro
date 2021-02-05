import { Users, Roles } from '../../../Database/mongo/models';

export const getAppUsersModel = (app_id) => {
  let role = Roles.findOne({ app_id });
  let user_id = role.user_id;

  let user = Users.find({ user_id });

  console.log(user, user_id, role);
};
