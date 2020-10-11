const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

const { usersModel } = require('../models');

const JWT_SECRET ='1q2w3e4r';

module.exports = async (req , res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(boom.unauthorized('no token informed'));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await usersModel.userByEmail(payload.email);

    if (!user) {
      return next(boom.unauthorized('invalid user'));
    }

    req.user = user;
  } catch (err) {
    return next(boom.unauthorized('invalid token'));
  }
};
