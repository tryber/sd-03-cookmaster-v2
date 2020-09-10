const model = require('../users/modelUsers');

const invalidEntries = {
  err: {
    message: 'Invalid entries. Try again.',
  },
  errEmail: {
    message: 'Email already registered',
  },
};

const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validateEntries = (name, email, password) => {
  if (!name || !email || !password) return invalidEntries.err;
  if (!regexEmail.test(email)) return invalidEntries.err;
};

const checkEmailExist = async (email) => {
  const result = await model.checkEmail(email);
  if (result) return invalidEntries.errEmail;
};

module.exports = {
  validateEntries,
  checkEmailExist,
};
