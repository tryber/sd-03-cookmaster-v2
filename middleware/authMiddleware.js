const jwt = require('jsonwebtoken');

const userModel = require('../model/userModel');
const { secret } = require('../service/secret');
const error = require('../service/error');

const authMiddleware = (required) => async (req, _res, next) => {
  console.log('entrou no middleware');
  if (required === false) return next();

  const token = req.headers.authorization;
  const errLength = { code: error.codes[401], message: error.messages[5] };
  const errAuth = { code: error.codes[401], message: error.messages[7] };

  if (!token) next(errAuth);
  if (token.length < 15) next(errLength);

  const payload = jwt.verify(token, secret);
  const user = await userModel.findEmail(payload.email);

  console.log('authmiddleware user', user);
  req.user = user;
  next();
};

module.exports = {
  authMiddleware,
};
