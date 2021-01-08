import { AbilityBuilder, Ability } from '@casl/ability';

const { can, cannot, build } = new AbilityBuilder(Ability);

can('read', 'Post');
cannot('delete', 'Post', { published: true });

export default build();
