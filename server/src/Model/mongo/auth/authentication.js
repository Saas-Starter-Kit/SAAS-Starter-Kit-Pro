import { Users } from '../../../Database/mongo/models.js';

export const getUser = async (email) => {
  let queryResult = Users.findOne({ email });
  return queryResult;
};

export const saveUsertoDB = async (email, username, firebaseId) => {
  let user = new Users({ email, username, fiebase_user_id: firebaseId });
  let id = user.save();
  return id;
};

export const updateUsernameModel = async (username, id) => {
  Users.findByIdAndUpdate(id, { username });
};

export const updateEmailModel = async (email, id) => {
  Users.findByIdAndUpdate(id, { email });
};
