const { insertUser, getEmail } = require('../models/usersModels');

const validateUserEmail = (email) => { // regex stack overflow https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email) return 'Invalid entries. Try again.';
  if (!re.test(email).toLowerCase()) return 'Invalid entries. Try again.';
  return false;
};

const validateUniqueEmail = async (email) => {
  if (await getEmail(email)) return 'Email already registered';
  return false;
};

const validateName = (name) => {
  if (!name) return 'Invalid entries. Try again.';
  return false;
};

const validatePassword = (password) => {
  if (!password) return 'Invalid entries. Try again.';
  return false;
};

const insertCommonUser = async (user) => {
  const userInserted = await insertUser(user);
  return userInserted;
};

module.exports = {
  insertCommonUser,
  validateUserEmail,
  validateName,
  validatePassword,
  validateUniqueEmail,
};
