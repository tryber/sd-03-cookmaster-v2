// model
const { createUser, getUserByEmail } = require('../models/userModel');

const validateUser = async (name, email, password) => {
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const duplicate = await getUserByEmail(email);
  switch (true) {
    case (!name || !email || !password || !validEmail):
      return { ok: false, status: 400, message: 'Invalid entries. Try again.' };
    case (duplicate && duplicate.email === email):
      return { ok: false, status: 409, message: 'Email already registered' };
    default:
      return { ok: true };
  }
};

const CreateUser = async (name, email, password) => {
  const validation = await validateUser(name, email, password);
  if (validation.ok) {
    const user = await createUser(name, email, password);
    return { ok: true, user };
  }
  return validation;
};

module.exports = {
  CreateUser,
};
