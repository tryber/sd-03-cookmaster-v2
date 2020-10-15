const modals = require('../models');

const checkLogin = async (email, password) =>
  modals.getUser({ email })
    .then((user) => {
      const error = { message: 'Incorrect username or password' };
      if (!user || user.password !== password) return error;
      return user;
    });

module.exports = checkLogin;
