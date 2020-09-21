// model
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/userModel');

const SECRET = 'alaalaoluisefera';
const JWTCONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const validateUser = async (name, email, password, type) => {
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

const CreateUser = async (name, email, password) => {
  const validation = await validateUser(name, email, password, 'REGISTER');
  if (validation.ok) {
    const user = await createUser(name, email, password);
    return { ok: true, user };
  }
  return validation;
};

const LogUser = async (uEmail, uPassword) => {
  // so some token things
  const { _id, email, role } = await getUserByEmail();
  const token = jwt.sign({ user }, SECRET, JWTCONFIG)
  if (email && password) return { token: 'blablabla' };
  return false;
};

module.exports = {
  CreateUser,
  LogUser,
};
