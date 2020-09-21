const jwt = require('jsonwebtoken');

const userModel = require('../model/userModel');
const { secret } = require('../service/secret');
const error = require('../service/error');

const validateToken = (token) => {
  const errLength = { code: error.codes[401], message: error.messages[5] };
  const errAuth = { code: error.codes[401], message: error.messages[7] };

  if (!token) return errAuth;
  if (token.length < 15) return errLength;
};

const authMiddleware = (required) => async (req, _res, next) => {
  if (required === false) return next();

  const token = req.headers.authorization;

  const validToken = await validateToken(token);
  //* Se gerou algum código de erro vai embora.
  if (validToken.code) return next(validToken);

  const payload = jwt.verify(token, secret);
  const user = await userModel.findEmail(payload.email);

  console.log('authmiddleware user', user);
  req.user = user;
  next();
};

module.exports = {
  authMiddleware,
};
