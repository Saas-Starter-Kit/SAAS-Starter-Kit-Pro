export const healthCheck = (req, res) => {
  res.status(200).send('All ok');
};

export const failHealthCheck = (req, res) => {
  res.status(404).send('Failed Health Check');
  throw new Error('Request Failed');
};

export const privateRoute = (req, res) => {
  res.status(200).send('Accessed Private Endpoint');
};
