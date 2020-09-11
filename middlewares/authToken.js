const jwt = require('jsonwebtoken');

const secret = 'secret';

const authToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'invalid token' });

  try {
    const { _id, email, role } = jwt.verify(authorization, secret);

    const user = { _id, email, role };

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = authToken;
