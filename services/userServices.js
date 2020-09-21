// model
const { createUser } = require('../models/userModel');
const { getUserByEmail } = require('../models/recipesModel');

const validateUser = (name, email, password) => {
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const duplicate = getUserByEmail(email);
  switch (true) {
    case (!name || !email || !password || !validEmail):
      return { ok: false, message: 'Invalid entries. Try again.' };
    case (!duplicate):
      return { ok: false, message: 'Email already registered' };
    default:
      return { ok: true, message: '' };
  }
};

const CreateUser = (name, email, password) => {
  const validation = validateUser(name, email, password);
  if (validation.ok) {
    return createUser(name, email, password);
  }
  return validation;
};

module.exports = {
  CreateUser,
};
