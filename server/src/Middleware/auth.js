import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export const setToken = (user) => {
  let opts = {
    expiresIn: '7d'
  };
  let secret = process.env.AUTH_SECRET;

  return jwt.sign({ user }, secret, opts);
};

export const requireAuth = () => {};
