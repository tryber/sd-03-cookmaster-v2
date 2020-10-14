const userModel = require('../models/userModel');

const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}; // based on https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

const validateUserData = async (name, email, password) => {
  if (!name || !email || !password || !validateEmail(email)) return { error: true, status: 400, message: 'Invalid entries. Try again.' };
  const emailExists = await userModel.getUserByEmail(email);
  if (emailExists) return { error: true, status: 409, message: 'Email already registered' };
  return { error: false };
};

const createUser = async (name, email, password) => {
  const validation = await validateUserData(name, email, password);
  if (validation.error) return validation;
  const user = await userModel.createUser(name, email, password);
  return user;
};

module.exports = {
  createUser,
};
