import { Users } from '../../../Database/mongo/models.js';

export const getUser = async (email) => {
  let user = await Users.findOne({ email });
  return user;
};

export const verifyUser = async (verify_key) => {
  let user = await Users.findOneAndUpdate(
    { verify_key },
    { verify_key: '', is_email_verified: true },
    { useFindAndModify: false }
  );

  return user;
};

export const saveUsertoDB = async (email, username, firebase_user_id, verify_key) => {
  let user = new Users({ email, username, firebase_user_id, verify_key });
  await user.save();
};

export const updateUsernameModel = async (username, _id) => {
  await Users.findByIdAndUpdate({ _id }, { username });
};

export const updateEmailModel = async (email, _id) => {
  await Users.findByIdAndUpdate({ _id }, { email });
};
