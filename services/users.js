const { usersModel } = require('../models');

const createUser = async (role, { name, email, password }) =>
  usersModel.add({ name, email, password, role });

const getUserByEmail = async (email) => usersModel.getUser({ email });

const validateLogin = async (email, password) =>
  usersModel.getUser({ email })
    .then((user) => {
      const errorObj = { error: true, message: 'Incorrect username or password' };
      if (!user || user.password !== password) return errorObj;
      return user;
    });

module.exports = {
  getUserByEmail,
  createUser,
  validateLogin,
};
