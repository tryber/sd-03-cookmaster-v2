const jwt = require('jsonwebtoken');
require('dotenv/config');
const SECRET = 'minhastringlongamuitolongaaindaestapequenoachoquefaltammaiscoisasachoqueagorafoi';
const isValidMiddleware = (token, next) => {
  try {
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
  req.user = isValidMiddleware(authorization, next);
  return next();
};

module.exports = verifyToken;
