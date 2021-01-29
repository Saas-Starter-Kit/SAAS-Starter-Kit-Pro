//this is a boilerplate to test new permissions

export const Permissions = async (req, res) => {
  if (!req.ability.can('read', 'admin', 'password')) {
    res
      .status(403)
      .send({ type: '403 Forbidden', message: 'User does not have access to this resource' });

    return;
  } else {
    res.status(200).send('You Have accessed Private Information');
    return;
  }
};
