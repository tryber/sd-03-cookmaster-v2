const modals = require('../models');

const checkLogin = async (email, password) => modals.getUser({ email })
  .then((user) => {
    if (!user || user.password !== password) {
      return { error: 'Usuario ou senha invalido' };
    }
    return user;
  });

module.exports = checkLogin;
