//this is a boilerplate to test new permissions
import { checkPermissions } from '../../Config/permissions.js';

export const Permissions = async (req, res) => {
  checkPermissions(req.ability, res, 'read', 'post');

  //  if (!req.ability.can('read', 'po')) {
  //    res
  //      .status(403)
  //      .send({ type: '403 Forbidden', message: 'User does not have access to this resource' });
  //  } else {
  //    res.status(200).send('All ok');
  //  }

  res.status(200).send('All ok');
};
