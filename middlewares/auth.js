const jwt = require('jsonwebtoken');
const { unauthorized } = require('../MyErrors');
const users = require('../models/users');

const authMiddleware = async (req, _res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) return next(unauthorized('Invalid entries. Try again.'));
  const token = req.headers.authorization;
  if (!token) return next(unauthorized('invalid token'));
  try {
    const decode = jwt.verify(token, 'seusecretdetoken');
    const user = await users.findUserByEmail(decode.data.email);
    if (!user) return next(unauthorized('jwt malformed'));
    const idUser = Object.values(user)[0];
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
