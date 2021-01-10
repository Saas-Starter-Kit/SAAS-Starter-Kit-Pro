import { AbilityBuilder, Ability } from '@casl/ability';

const roleRules = (can, role) => {
  if (role.is_admin) {
    //admin has global priviledges
    can('manage', 'all');
  } else if (role.is_user) {
    can('read', 'post');
    can('read', 'article', ['title', 'description']);
  }
};

export const defineRulesFor = (role) => {
  const { can, rules } = new AbilityBuilder(Ability);

  roleRules(can, role);

  return rules;
};

export const buildAbilityFor = (role) => {
  return new Ability(defineRulesFor(role), {
    detectSubjectType: (object) => (object ? object.constructor : null)
  });
};

export const updateRole = (ability, role) => {
  const { can, rules } = new AbilityBuilder();

  roleRules(can, role);

  ability.update(rules);
};

let defaultRole = {
  is_user: true,
  is_admin: false
};

export const ability = buildAbilityFor(defaultRole);
