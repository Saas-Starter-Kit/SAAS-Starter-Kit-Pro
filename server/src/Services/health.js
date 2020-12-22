export const healthCheck = (req, res) => {
  res.status(200).send('All ok');
};

export const failHealthCheck = (req, res) => {
  res.status(404).send('Failed Health Check');
};

export const privateRoute = (req, res) => {
  res.status(200).send('Accessed Private Endpoint');
};
