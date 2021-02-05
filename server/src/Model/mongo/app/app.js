import { Apps, Roles, Todos } from '../../../Database/mongo/models.js';

export const getAppModel = async (user_id) => {
  let roles = Roles.findOne({ user_id });
  let apps = Apps.findOne({ user_id });

  console.log(roles, apps);
  return { roles, apps };
};

export const postAppModel = async (name) => {
  let app = new Apps({ app_name: name });
  app.save();
  return app._id;
};

export const deleteAppModel = async (app_id) => {
  Roles.findOneAndDelete({ app_id });
  Todos.findOneAndDelete({ app_id });
  Apps.findOneAndDelete({ app_id });
};
