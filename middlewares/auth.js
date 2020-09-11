const jwt = require('jsonwebtoken');
require('dotenv/config');
const rescue = require('express-rescue');
const Boom = require('boom');

const { SECRET } = process.env;

module.exports = rescue(async (req, _res, next) => {
  const { authorization: token } = req.headers || {};

  if (!token) return next(Boom.unauthorized('missing auth token'));

  try {
    const data = jwt.verify(token, SECRET);
    const { user } = data || {};

    if (!data || !user) return next(Boom.unauthorized('Invalid Token'));

    req.user = user;

    next();
  } catch (err) {
    next(Boom.unauthorized('jwt malformed'));
  }
});
