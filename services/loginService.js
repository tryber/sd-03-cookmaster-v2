const helpers = require('./helpers');

const loginCheck = (email, password) => {
  console.log(email);
  if (email === undefined || email === ' ') {
    return { code: 'email_invalid', message: 'All fields must be filled' };
  }
  if (password === undefined) {
    return { code: 'password_invalid', message: 'All fields must be filled' };
  }
  const isValidEmail = helpers.isValidEmail(email);
  if (isValidEmail) {
    return { code: 'password_invalid', message: 'Incorrect username or password' };
  }
};

module.exports = {
  loginCheck,
}