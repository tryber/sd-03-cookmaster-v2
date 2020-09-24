const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/userModel');
require('dotenv/config');

const JWTCONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const ValidateUser = async (name, email, password) => {
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const duplicate = await getUserByEmail(email);
  switch (true) {
    case (!name || !email || !password || !validEmail):
      return { isValid: false, status: 400, message: 'Invalid entries. Try again.' };
    case (duplicate && duplicate.email === email):
      return { isValid: false, status: 409, message: 'Email already registered' };
    default:
      return { isValid: true, status: 201, message: '' };
  }
};

const ValidadeLogin = (email, password) => {
  const validEmail = email && /^[^@\s]+@[a-zA-Z]+\.[^@\s]+$/.test(email);
  const validPass = password && (password.length > 6 || password === 'admin');
  switch (true) {
    case (!email || !password):
      return { isValid: false, status: 401, message: 'All fields must be filled' };
    case (!validEmail || !validPass):
      return { isValid: false, status: 401, message: 'Incorrect username or password' };
    default:
      return { isValid: true, status: 200 };
  }
};

const CreateAdmin = async (role, name, email, password) => {
  if (role !== 'admin') {
    return {
      isValid: false, status: 403, message: 'Only admins can register new admins',
    };
  }
  const { isValid, status, message } = await ValidateUser(name, email, password);
  if (isValid) {
    const user = await createUser(name, email, password, 'admin');
    return { isValid: true, status, user };
  }
  return { isValid, status, message };
};

const CreateUser = async (name, email, password) => {
  const { isValid, status, message } = await ValidateUser(name, email, password);
  if (isValid) {
    const user = await createUser(name, email, password, 'user');
    return { isValid: true, status, user };
  }
  return { isValid, status, message };
};

const LogUser = async (uEmail, uPassword) => {
  const { isValid, status, message } = ValidadeLogin(uEmail, uPassword);
  if (isValid) {
    const { password, _id, ...user } = await getUserByEmail(uEmail);
    const token = jwt.sign({ id: _id, ...user }, process.env.SECRET, JWTCONFIG);
    return { isValid, status, token };
  }
  return { isValid, status, message };
};

module.exports = {
  CreateAdmin,
  CreateUser,
  LogUser,
};
