const jwt = require('jsonwebtoken');

const tokenHandler = (token) => {
  const SECRET = 'alaalaoluisefera';
  return jwt.verify(token, SECRET);
};

const verifyToken = (required) => async (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    if (!required) return next();
    if (!authorization) {
      return next({ status: 401, message: 'invalid token' });
    }
    req.user = tokenHandler(authorization);
    return next();
  } catch (err) {
    return next({ status: 401, message: err.message });
  }
};

module.exports = verifyToken;
