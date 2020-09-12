const helpers = require('./helpers');
const userModel = require('../models/UserModel');

const loginCheck = async (email, password) => {
  if (email === undefined || email === ' ') {
    return { code: 'email_invalid', message: 'All fields must be filled' };
  }
  if (password === undefined) {
    return { code: 'password_invalid', message: 'All fields must be filled' };
  }
  const isValidEmail = helpers.isValidEmail(email);
  if (!isValidEmail) {
    return { code: 'password_invalid', message: 'Incorrect username or password' };
  }
  const confirmLogin = await userModel.searchByEmail(email);
  if (confirmLogin && confirmLogin.email === email && confirmLogin.password === password) {
    return { code: 'valid', message: 'Alright' };
  }
  return { code: 'invalid', message: 'Incorrect username or password' };
};

module.exports = {
  loginCheck,
};
