import mongoose from 'mongoose';
const objectId = mongoose.Types.ObjectId;
import { Users } from '../../../Database/mongo/models.js';

export const getUser = async (email) => {
  await Users.findOne({ email });
};

export const verifyUser = async (verify_key) => {
  let user = await Users.findByIdAndUpdate(
    { verify_key },
    { verify_key: '', is_email_verified: true }
  );
  return user;
};

export const saveUsertoDB = async (email, username, firebase_user_id, verify_key) => {
  let user = new Users({ email, username, firebase_user_id, verify_key });
  await user.save();
};

export const updateUsernameModel = async (username, id) => {
  await Users.findByIdAndUpdate({ id }, { username });
};

export const updateEmailModel = async (email, id) => {
  return await Users.findByIdAndUpdate({ id }, { email });
};
