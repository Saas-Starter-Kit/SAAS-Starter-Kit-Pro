import { Users, Roles, Invites } from '../../../Database/mongo/models.js';
import _ from 'lodash';

export const getAppUsersModel = async (org_id) => {
  // get org roles user is associated with
  let roles = await Roles.find({ org_id }).lean();
  roles = roles.map((item) => ({ ...item, id: item._id }));

  //create array with org ids
  let UserIds = roles.map((item) => item.user_id);

  //find orgs with matching role ids and add id property
  let users = await Users.find({ _id: { $in: UserIds } }).lean();
  users = users.map((item) => ({ ...item, id: item._id }));

  let UsersRolesArr = [];

  //merge roles and orgs
  users.map((item, index) => UsersRolesArr.push(_.merge(users[index], roles[index])));

  console.log(UsersRolesArr);

  return [...UsersRolesArr];
};

export const CreateInvite = async (org_id, verify_key, recipient_email, sender_email) => {
  let invite = new Invites({ org_id, verify_key, recipient_email, sender_email });
  await invite.save();
};

export const VerifyInviteModel = async (verify_key) => {
  let invite = await Invites.findOne({ verify_key });

  return invite;
};
