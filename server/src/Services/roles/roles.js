import {
  getRoleModel,
  checkRoleExists,
  CreateOrgRole,
  deleteRoleModel
} from '../../Model/mongo/roles/roles.js';

export const getRole = async (req, res) => {
  let user_id = req.query.user_id;
  let org_id = req.query.org_id;

  let result = await getRoleModel(user_id, org_id);

  res.status(200).send(result);
};

//create role
export const createRole = async (req, res) => {
  let org_id = req.body.org_id;
  let user_id = req.body.user_id;
  let role = req.body.role;

  //If role exists for app send error message
  const isRoleExists = await checkRoleExists(org_id, user_id);
  if (isRoleExists) {
    res
      .status(400)
      .send({ type: 'Failed to Create Role', message: 'User already has role in this app' });
    return;
  }

  await CreateOrgRole(org_id, user_id, role);

  res.status(200).send('Post Successful');
};

export const deleteRole = async (req, res) => {
  let role_id = req.query.role_id;

  await deleteRoleModel(role_id);

  res.status(200).send('Delete Successful');
};
