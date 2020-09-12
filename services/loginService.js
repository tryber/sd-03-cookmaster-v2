const helpers = require('./helpers');
const userModel = require('../models/UserModel');

const checkInfo = (email, password) => {
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
};

const loginCheck = async (email, password) => {
  const check = await checkInfo(email, password);
  if (check !== undefined) {
    return check;
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
