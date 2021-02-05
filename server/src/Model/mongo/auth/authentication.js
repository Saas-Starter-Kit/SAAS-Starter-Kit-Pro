import { User } from '../../../Database/mongo/models';

export const getUser = async (email) => {
  let queryResult = User.findOne({ email });
  console.log(queryResult);
};

export const saveUsertoDB = async (email, username, firebaseId) => {
  let user = new User({ email, username, fiebase_user_id: firebaseId });
  let id = user.save();
  console.log(id);
};

export const updateUsernameModel = async (username, id) => {
  User.findByIdAndUpdate(id, { username });
};

export const updateEmailModel = async (email, id) => {
  User.findByIdAndUpdate(id, { email });
};
