import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // token validation
  try {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.AUTH_SECRET);
    next();
  } catch (err) {
    res.status(403).send(err);
    return;
  }
};

export const setToken = (user) => {
  let opts = {
    expiresIn: '7d'
  };
  let secret = process.env.AUTH_SECRET;

  return jwt.sign({ user }, secret, opts);
};
