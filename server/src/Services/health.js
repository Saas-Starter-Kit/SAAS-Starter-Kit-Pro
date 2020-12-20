export const healthCheck = (req, res) => {
  res.status(200).send('All ok');
};

export const privateRoute = (req, res) => {
  res.send('Accessed Private Endpoint');
};
