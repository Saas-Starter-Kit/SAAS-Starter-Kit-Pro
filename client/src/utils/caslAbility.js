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

export const buildAbilityFor = (role) => {
  return new Ability(defineRulesFor(role));
};

export const updateRole = (ability, role) => {
  const { can, rules, cannot } = new AbilityBuilder();

  roleRules(can, role, cannot);

  ability.update(rules);
};

let defaultRole = 'user';

export const ability = buildAbilityFor(defaultRole);
