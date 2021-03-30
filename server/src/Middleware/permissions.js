import { buildAbilityFor } from '../Config/permissions.js';

export const requirePermissions = (action, subject) => {
  return (req, res, next) => {
    if (!req.ability.can(action, subject)) {
      let error = {
        type: '403 Forbidden',
        message: 'User does not have access to this resource'
      };

      res.status(403).send(error);
    } else {
      next();
    }
  };
};

export const createPermissions = (req, _, next) => {
  let role = req.body.role || req.query.role || null;
  req.ability = buildAbilityFor(role);
  next();
};
