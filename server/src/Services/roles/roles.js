import {
  getRoleModel,
  checkRoleExists,
  postRoleModel,
  deleteRoleModel
} from '../../Model/mongo/roles/roles.js';

export const getRole = async (req, res, next) => {
  try {
    let user_id = req.query.user_id;
    let app_id = req.query.app_id;

    let result = await getRoleModel(app_id, user_id);

    res.status(200).send(result);
  } catch (e) {
    next(e)
  }

};

export const postRole = async (req, res, next) => {
  try {

    let app_id = req.body.app_id;
    let user_id = req.body.user_id;
    let role = req.body.role;

    if (!user_id) {
      res
        .status(400)
        .send({ type: 'Failed to Create Role', message: 'UserId required to create role' });
      return;
    }

    //If role exists for app send error message
    const isRoleExists = await checkRoleExists(app_id, user_id);
    if (isRoleExists) {
      res
        .status(400)
        .send({ type: 'Failed to Create Role', message: 'User already has role in this app' });
      return;
    }
    
    await postRoleModel(app_id, user_id, role);

    res.status(200).send('Post Successful');
  } catch (e) {
    next(e)
  }
};

export const deleteRole = async (req, res, next) => {
  try {
    let role_id = req.query.role_id;

    if (role_id) {
      await deleteRoleModel(role_id);

      res.status(200).send('Delete Successful');
    } else {
      throw new Error('RoleId required to delete the role')
    }
  } catch (e) {
    next(e)
  }
};
