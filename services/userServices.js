const jwt = require('jsonwebtoken');

const { usersModel } = require('../models');

const SECRET = '1q2w3e4r';

const JWTCONFIG = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const createUser = async (user) => {
  const existentUser = await usersModel.userByEmail(user.email);

  if (existentUser) {
    return;
  }

  const createdUser = await usersModel.createUser(user);

  return createdUser;
};

const createAdmin = async (admin) => {
  const existentAdmin = await usersModel.userByEmail(admin.email);

  if (existentAdmin) {
    return;
  }

  const createdAdmin = await usersModel.createAdmin(admin);

  return createdAdmin;
};

const login = async ({ email: userEmail, password }) => {
  const {
    _id,
    role,
    email,
    password: userPassword,
  } = await usersModel.userByEmail(userEmail);

  if (password !== userPassword) {
    return;
  }

  const userWithoutPassword = { _id, role, email };
  const token = jwt.sign(userWithoutPassword, SECRET, JWTCONFIG);

  return token;
};

module.exports = {
  login,
  createUser,
  createAdmin,
};
