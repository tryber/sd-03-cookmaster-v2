const jwt = require('jsonwebtoken');

const { usersModel } = require('../models');

const createUser = async (user) => {
  const existentUser = await usersModel.userByEmail(user.email);

  if (existentUser) {
    return;
  }

  const createdUser = await usersModel.createUser(user);

  return createdUser;
};

const login = async ({ email: userEmail, password }) => {
  const {
    _id,
    role,
    email,
    password: userPassword
  } = await usersModel.userByEmail(userEmail);

  const userWithoutPassword = { _id, role, email };
  const token = jwt.sign(JSON.stringify(userWithoutPassword), '1q2w3e4r');

  if (password !== userPassword) {
    return;
  };

  return token;
};

module.exports = {
  createUser,
  login,
};
