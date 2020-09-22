// model
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/userModel');

const ValidateUser = async (name, email, password, type) => {
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const duplicate = await getUserByEmail(email);
  switch (true) {
    case (!name || !email || !password || !validEmail):
      return { ok: false, status: 400, message: 'Invalid entries. Try again.' };
    case (type === 'REGISTER' && duplicate && duplicate.email === email):
      return { ok: false, status: 409, message: 'Email already registered' };
    default:
      return { ok: true };
  }
};

const ValidadeLogin = (email, password) => {
  const validEmail = email && /^[^@\s]+@[a-zA-Z]+\.[^@\s]+$/.test(email);
  const validPass = password && password.length > 6;
  switch (true) {
    case (!email || !password):
      return { ok: false, status: 401, message: 'All fields must be filled' };
    case (!validEmail || !validPass):
      return { ok: false, status: 401, message: 'Incorrect username or password' };
    default:
      return { ok: true, status: 200 };
  }
};

const CreateUser = async (name, email, password) => {
  const validation = await ValidateUser(name, email, password, 'REGISTER');
  if (validation.ok) {
    const user = await createUser(name, email, password);
    return { ok: true, user };
  }
  return validation;
};

const LogUser = async (uEmail, uPassword) => {
  const { ok, status, message } = ValidadeLogin(uEmail, uPassword);
  if (ok) {
    const user = await getUserByEmail(uEmail);
    const SECRET = 'alaalaoluisefera';
    const JWTCONFIG = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ user }, SECRET, JWTCONFIG);
    return { ok, status, token };
  }
  return { ok, status, message };
};

module.exports = {
  CreateUser,
  LogUser,
};
