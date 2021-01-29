import { AbilityBuilder, Ability } from '@casl/ability';

const roleRules = (can, role, cannot) => {
  if (role === 'admin') {
    //admin has global priviledges
    can('manage', 'all');
    cannot('read', 'user', 'password');
  } else if (role === 'user') {
    can('read', 'post');
    can('read', 'article', ['title', 'description']);
    can('read', 'user', 'password');
  }
};

export const defineRulesFor = (role) => {
  const { can, rules, cannot } = new AbilityBuilder(Ability);

  roleRules(can, role, cannot);

  return rules;
};

export const defineAbilityFor = (role) => {
  if (role) {
    return new Ability(defineRulesFor(role));
  } else {
    return new Ability(defineRulesFor({}));
  }
};

export const permissionsMiddleware = (req, _, next) => {
  let role = req.body.role || req.query.role || null;
  req.ability = defineAbilityFor(role);
  next();
};

export const checkPermissions = (ability, res, action, subject, fields) => {
  try {
    if (!ability.can(action, subject, fields)) {
      return res
        .status(403)
        .send({ type: '403 Forbidden', message: 'User does not have access to this resource' });
    }
  } catch (err) {
    console.log(err);
  }
  return;
};
