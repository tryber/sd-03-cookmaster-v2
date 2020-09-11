const jwt = require('jsonwebtoken');

const userModel = require('../model/userModel');
const { secret } = require('../service/secret');
const error = require('../service/error');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  const err = { code: error.codes[401], message: error.messages[5] };

  if (token.length < 15) next(err);

  const payload = jwt.verify(token, secret);
  const user = await userModel.findEmail(payload.email);
  console.log(user);

  req.user = user;
  next();
};

module.exports = {
  authMiddleware,
};
