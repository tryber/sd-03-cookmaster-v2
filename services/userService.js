const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = 'mirellasproject';

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

const validateLoginData = async (email, password) => {
  if (!email || !password) return { error: true, status: 401, message: 'All fields must be filled' };

  const userData = await userModel.getUserByEmail(email);
  if (!userData || password !== userData.password) return { error: true, status: 401, message: 'Incorrect username or password' };
  return { error: false };
};

const login = async (email, password) => {
  const validation = await validateLoginData(email, password);
  if (validation.error) return validation;

  const user = await userModel.getUserByEmail(email);
  console.log('login', user);

  const jwtConfig = { expiresIn: '50min', algorithm: 'HS256' };
  const token = jwt.sign({ user }, JWT_SECRET, jwtConfig);
  return { token };
};

module.exports = {
  createUser,
  login,
};
