import { AbilityBuilder, Ability } from '@casl/ability';

const roleRules = (can, cannot, role) => {
  if (role.is_admin) {
    can('manage', 'all');
  } else if (role.is_user) {
    cannot('read', 'post');
  }
};

export const defineRulesFor = (role) => {
  const { can, cannot, rules } = new AbilityBuilder(Ability);

  roleRules(can, cannot, role);

  return rules;
};

export const buildAbilityFor = (role) => {
  return new Ability(defineRulesFor(role), {
    detectSubjectType: (object) => (object ? object.constructor : null)
  });
};

export const updateRole = (ability, role) => {
  const { can, cannot, rules } = new AbilityBuilder();

  roleRules(can, cannot, role);

  ability.update(rules);
};

let defaultRole = {
  is_user: true,
  is_admin: false
};

export const ability = buildAbilityFor(defaultRole);
