const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { INCORRECT_LOGIN, errMessage } = require('./errorsServices');
const JWT_SECRET = require('./JWT');

const createUser = async (name, email, password, role) => {
  const searchUser = await userModel.getUserByEmail(email);
  if (searchUser) return { err: true, message: errMessage('Email already registered') };
  const data = await userModel.createUser(name, email, password, role);
  const { _id } = data;
  return { user: { name, email, role, _id } };
};

const getUserByEmail = async (email) => userModel.getUserByEmail(email);

const tryLoginToken = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user || user.password !== password) {
    return { err: true, message: errMessage(INCORRECT_LOGIN) };
  }

  const { password: _, ...userWithoutPassword } = user;

  const singOptions = {
    algorithm: 'HS256',
    expiresIn: '15m',
  };

  const token = jwt.sign(userWithoutPassword, JWT_SECRET, singOptions);
  return { token };
};

module.exports = {
  createUser,
  tryLoginToken,
};
