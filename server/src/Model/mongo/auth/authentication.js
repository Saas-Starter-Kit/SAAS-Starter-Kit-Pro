import mongoose from 'mongoose';
const objectId = mongoose.Types.ObjectId;
import { Users } from '../../../Database/mongo/models.js';

export const getUser = async (email) => {
  return await Users.findOne({ email: email }).lean();
};

export const saveUsertoDB = async (email, username, firebaseId) => {
  let user = new Users({ email, username, fiebase_user_id: firebaseId });
  let id = await user.save();
  return id;
};

export const updateUsernameModel = async (username, id) => {
  try {
    return await Users.findByIdAndUpdate({ _id: objectId(id) }, { $set: { username: username } }, { useFindAndModify: false });
  } catch (e) {
    throw new Error(e)
  }
};

export const updateEmailModel = async (email, id) => {
  try {
    return await Users.findByIdAndUpdate({ _id: objectId(id) }, { $set: { email: email } }, { useFindAndModify: false });
  } catch (e) {
    throw new error(e)
  }

};
