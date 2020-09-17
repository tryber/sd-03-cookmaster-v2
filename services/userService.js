const { userModel } = require('../models');
const { generateJWT } = require('../middlewares/auth');

// Referência regex para validação de email:
// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
const regexEmail = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const validateEntries = (name, email, password) => {
  if (!name || !email || !regexEmail.test(email) || !password) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }

  return true;
};

const userLogin = async (email, password) => {
  if (!email || !password) return { message: 'All fields must be filled' };

  const user = await userModel.getUserByEmail(email);

  if (!user || user.password !== password) return { message: 'Incorrect username or password' };

  return generateJWT(user);
};

const registerUser = async (name, email, password) => {
  const isEntriesValid = validateEntries(name, email, password);

  if (typeof isEntriesValid === 'object') return isEntriesValid;

  const isEmailAlreadyRegistered = await userModel.getUserByEmail(email);

  if (isEmailAlreadyRegistered) {
    return { code: 'conflict', message: 'Email already registered' };
  }

  const registeredUser = await userModel.registerUser(name, email, password);

  return registeredUser;
};

const registerAdmin = async (name, email, password, user) => {
  const isEntriesValid = validateEntries(name, email, password);

  if (typeof isEntriesValid === 'object') return isEntriesValid;

  const loggedUser = await userModel.getUserByEmail(user.email);

  if (loggedUser.role !== 'admin') return { message: 'Only admins can register new admins' };

  const registeredUser = await userModel.registerUser(name, email, password, 'admin');

  return registeredUser;
};

module.exports = {
  registerUser,
  userLogin,
  registerAdmin,
};
