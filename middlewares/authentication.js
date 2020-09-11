const jwt = require('jsonwebtoken');

const secret = 'teste1234';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'missing auth token' });
  try {
    const { email, role, _id } = jwt.verify(authorization, secret);
    req.user = { email, role, _id };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
