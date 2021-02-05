import { Apps, Roles, Todos } from '../../../Database/mongo/models';

export const getAppModel = async (user_id) => {
  Roles.findOne({ user_id });
  Apps.findOne({ user_id });
};

export const postAppModel = async (name) => {
  let app = new Apps({ app_name: name });
  app.save();
};

export const deleteAppModel = async (app_id) => {
  Roles.findOneAndDelete({ app_id });
  Todos.findOneAndDelete({ app_id });
  Apps.findOneAndDelete({ app_id });
};
