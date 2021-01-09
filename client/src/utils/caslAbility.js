import { AbilityBuilder, Ability } from '@casl/ability';

export default function defineAbilityFor(user) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.isAdmin) {
    can('manage', 'all'); // read-write access to everything
  } else {
    can('read', 'all'); // read-only access to everything
  }

  cannot('delete', 'Post');

  return build();
}
