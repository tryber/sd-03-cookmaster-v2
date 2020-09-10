const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { INCORRECT_LOGIN } = require('./errorsServices');
const JWT_SECRET = require('./JWT');

const createUser = async (name, email, password, role) => {
  const searchUser = await userModel.getUserByEmail(email);
  if (searchUser) return { err: true, jsonMessage: { message: 'Email already registered' } };
  const userCreated = await userModel.createUser(name, email, password, role);
  return userCreated;
};

const getUserByEmail = async (email) => userModel.getUserByEmail(email);

const tryLoginToken = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user || user.password !== parseInt(password, 10)) {
    return { err: true, jsonMessage: { message: INCORRECT_LOGIN } };
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
