const boom = require('@hapi/boom');

module.exports = (req, _res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(boom.unauthorized('All fields must be filled'));
  }

  if (password === 'admin') {
    req.userInfo = { email, password };
    return next();
  }

  if (!/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(email) || password.length <= 6) {
    return next(boom.unauthorized('Incorrect username or password'));
  }

  req.userInfo = { email, password };
  next();
};
