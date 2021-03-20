import { Users, Roles, Invites } from '../../../Database/mongo/models.js';

export const getAppUsersModel = async (org_id) => {
  let roles = Roles.find({ org_id });
  let users = Users.find({ org_id });

  return { roles, users };
};

export const CreateInvite = async (org_id, randomBytes, recipient_email, sender_email) => {
  let invite = new Invites({ org_id, randomBytes, recipient_email, sender_email });
  await invite.save();
};

export const VerifyInviteModel = async (invite_key) => {
  let invite = await Invites.find({ invite_key });

  return invite.org_id;
};
