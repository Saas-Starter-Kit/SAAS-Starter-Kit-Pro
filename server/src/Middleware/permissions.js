import { defineAbilityFor } from '../Config/permissions.js';

export const requirePermissions = (req, res, next) => {
  let userAction = req.body.userAction || req.query.userAction;
  let subject = req.body.subject || req.query.subject;

  if (!req.ability.can(userAction, subject)) {
    let error = {
      type: '403 Forbidden',
      message: 'User does not have access to this resource'
    };

    res.status(403).send(error);
  } else {
    next();
  }
};

export const permissionsMiddleware = (req, _, next) => {
  let role = req.body.role || req.query.role || null;
  req.ability = defineAbilityFor(role);
  next();
};
