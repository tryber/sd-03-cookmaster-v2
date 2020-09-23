// model
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/userModel');

const ValidateUser = async (name, email, password) => {
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const duplicate = await getUserByEmail(email);
  switch (true) {
    case (!name || !email || !password || !validEmail):
      return { ok: false, status: 400, message: 'Invalid entries. Try again.' };
    case (duplicate && duplicate.email === email):
      return { ok: false, status: 409, message: 'Email already registered' };
    default:
      return { ok: true, status: 201, message: '' };
  }
};

const ValidadeLogin = (email, password) => {
  const validEmail = email && /^[^@\s]+@[a-zA-Z]+\.[^@\s]+$/.test(email);
  const validPass = password && (password.length > 6 || password === 'admin');
  switch (true) {
    case (!email || !password):
      return { ok: false, status: 401, message: 'All fields must be filled' };
    case (!validEmail || !validPass):
      return { ok: false, status: 401, message: 'Incorrect username or password' };
    default:
      return { ok: true, status: 200 };
  }
};

const CreateAdmin = async (role, name, email, password) => {
  if (role !== 'admin') {
    return {
      ok: false, status: 403, message: 'Only admins can register new admins',
    };
  }
  const { ok, status, message } = await ValidateUser(name, email, password);
  if (ok) {
    const user = await createUser(name, email, password, 'admin');
    return { ok: true, status, user };
  }
  return { ok, status, message };
};

const CreateUser = async (name, email, password) => {
  const { ok, status, message } = await ValidateUser(name, email, password);
  if (ok) {
    const user = await createUser(name, email, password, 'user');
    return { ok: true, status, user };
  }
  return { ok, status, message };
};

const LogUser = async (uEmail, uPassword) => {
  const { ok, status, message } = ValidadeLogin(uEmail, uPassword);
  if (ok) {
    const { password, _id, ...user } = await getUserByEmail(uEmail);
    const SECRET = 'alaalaoluisefera';
    const JWTCONFIG = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ id: _id, ...user }, SECRET, JWTCONFIG);
    return { ok, status, token };
  }
  return { ok, status, message };
};

module.exports = {
  CreateAdmin,
  CreateUser,
  LogUser,
};
