const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // if (!authorization) return next('noauth');
    const decoded = jwt.decode(authorization);
    if (!decoded) return next('invalid_token');
    req.user = decoded;
    return next();
  } catch (e) {
    return next('invalid_token');
  }
};

module.exports = { validateToken };
