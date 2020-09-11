const INVALID_ENTRY = 'Invalid entries. Try again.';
const INVALID_LOGIN_DATA = 'All fields must be filled';
const INCORRECT_LOGIN = 'Incorrect username or password';

const errMessage = (message) => ({
  message,
});

module.exports = {
  INVALID_ENTRY,
  INVALID_LOGIN_DATA,
  INCORRECT_LOGIN,
  errMessage,
};
