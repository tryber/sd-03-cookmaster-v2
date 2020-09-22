const jwt = require('jsonwebtoken');

const verifyToken = (required) => async (req, _res, next) => {
  try {
    if (!required) return next();
    const { authorization } = req.headers;
    const SECRET = 'alaalaoluisefera';
    const data = jwt.verify(authorization, SECRET);
    if (!authorization) {
      return next({ status: 401, message: 'invalid token' });
    }
    req.user = data;
    return next();
  } catch (err) {
    return next({ status: 401, message: err.message });
  }
};

module.exports = verifyToken;
