const model = require('../users/modelUsers');

const invalidEntries = {
  err: {
    message: 'Invalid entries. Try again.',
  },
  errEmail: {
    message: 'Email already registered',
  },
};

const invalidLogin = {
  noEmail: {
    message: 'All fields must be filled',
  },
  emailInvalid: {
    message: 'Incorrect username or password',
  },
};

const invalidId = {
  mongo: {
    message: 'recipe not found',
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

const validateLogin = (email) => {
  if (!email) return invalidLogin.noEmail;
  if (!regexEmail.test(email)) return invalidLogin.emailInvalid;
};

const validadePassword = (password) => {
  if (!password) return invalidLogin.noEmail;
};

const validateId = (id) => {
  const regex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  if (!regex.test(id)) return invalidId.mongo;
};

module.exports = {
  validateEntries,
  checkEmailExist,
  validateLogin,
  validadePassword,
  validateId,
};
