// import { deleteAppModel, getAppModel, postAppModel } from '../../Model/mongo/app/app.js';

import { deleteAppModel, getAppModel, postAppModel } from '../../Model/mongo/app/app.js';

export const getApp = async (req, res, next) => {
  try {
    let user_id = req.query.user_id;

    let result = await getAppModel(user_id);
  
    res.status(200).send(result);
  } catch (e) {
    next(e)
  }
};

export const postApp = async (req, res) => {
  let name = req.body.name;
  
  let result = await postAppModel(name);

  res.status(200).send(result);
};

export const deleteApp = async (req, res) => {
  let app_id = req.query.app_id;
  await deleteAppModel(app_id);

  res.status(200).send('Delete Successful');
};
