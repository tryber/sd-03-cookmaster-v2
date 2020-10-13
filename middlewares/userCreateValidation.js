const boom = require('@hapi/boom');

module.exports = (req, _res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(boom.badRequest('Invalid entries. Try again.'));
  }

  if (!/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(email)) {
    return next(boom.badRequest('Invalid entries. Try again.'));
  }

  req.userInfo = { name, email, password };
  next();
};
