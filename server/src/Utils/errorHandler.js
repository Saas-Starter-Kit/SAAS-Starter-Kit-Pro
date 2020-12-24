export const errorHandler = (err, req, res, next) => {
  let message = null;

  //check for more conditions
  if (err.raw) {
    message = err.raw.message;
  } else if (err.message) {
    message = err.message;
  } else if (err.sqlMessage) {
    message = err.sqlMessage;
  } else {
    message = 'Server Request Failed';
  }

  console.error(err);

  res.status(500).send({ message });
};
