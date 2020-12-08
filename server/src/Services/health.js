export const healthCheck = (req, res) => {
  res.send('All ok');
};

export const privateRoute = (req, res) => {
  res.send('Accessed Private Endpoint');
};
