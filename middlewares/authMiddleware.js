const jwt = require('jsonwebtoken');

const tokenHandler = (token, next) => {
  try {
    const SECRET = 'alaalaoluisefera';
    return jwt.verify(token, SECRET);
  } catch (err) {
    return next({ status: 401, message: err.message });
  }
};

const verifyToken = (required) => async (req, _res, next) => {
  const { authorization } = req.headers;
  if (!required) return next();
  if (!authorization) {
    return next({ status: 401, message: 'missing auth token' });
  }
  req.user = tokenHandler(authorization, next);
  return next();
};

module.exports = verifyToken;
