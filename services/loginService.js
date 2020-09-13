const { getUserWithEmail } = require('../models/usersModels');

const getUserByEmail = async (email) => {
  const user = await getUserWithEmail(email);
  return user;
};

const validateUserEmail = (email) => { // regex stack overflow https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) return 'Incorrect username or password';
  return false;
};

module.exports = {
  getUserByEmail,
  validateUserEmail,
};
