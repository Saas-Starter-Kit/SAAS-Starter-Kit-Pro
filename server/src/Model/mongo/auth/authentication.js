import { Users } from '../../../Database/mongo/models.js';

export const getUser = async (email) => {
  let queryResult = await Users.findOne({ email });
  return queryResult;
};

export const saveUsertoDB = async (email, username, firebaseId) => {
  let user = new Users({ email, username, fiebase_user_id: firebaseId });
  let id = await user.save();
  return id;
};

export const updateUsernameModel = async (username, id) => {
  const updatedRes = await Users.findByIdAndUpdate(id, { username });
  return updatedRes;
};

export const updateEmailModel = async (email, id) => {
  const updatedRes = await Users.findByIdAndUpdate(id, { email });
  return updatedRes;
};
