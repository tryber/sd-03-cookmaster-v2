const jwt = require('jsonwebtoken');
const { unauthorized, forbidden } = require('../MyErrors');
const users = require('../models/users');

const authAdminMiddleware = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(unauthorized('missing auth token'));
  try {
    const decode = jwt.verify(token, 'seusecretdetoken');
    if (!decode) return next(unauthorized('invalid token'));
    const user = await users.findUserByEmail(decode.data.email);
    if (!user || user.role !== 'admin') return next(forbidden('Only admins can register new admins'));
    next();
  } catch (err) {
    return next(unauthorized('jwt malformed'));
  }
};

module.exports = {
  authAdminMiddleware,
};
