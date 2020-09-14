const jwt = require('jsonwebtoken');
const { unauthorized } = require('../MyErrors');
const users = require('../models/users');

const authMiddleware = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(unauthorized('missing auth token'));
  try {
    const decode = jwt.verify(token, 'seusecretdetoken');
    if (!decode) return next(unauthorized('invalid token'));
    const user = await users.findUserByEmail(decode.data.email);
    if (!user) return next(unauthorized('jwt malformed'));
    const { password, ...nopass } = user;
    const idUser = Object.values(user)[0];
    req.user = nopass;
    req.userId = idUser;
    req.recipe = req.body;
    next();
  } catch (err) {
    return next(unauthorized('jwt malformed'));
  }
};

module.exports = {
  authMiddleware,
};
