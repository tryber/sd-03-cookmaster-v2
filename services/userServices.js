const { usersModel } = require('../models');

const createUser = async (user) => {
  const existentUser = await usersModel.userByEmail(user.email);

  if (existentUser) {
    return;
  }

  const createdUser = await usersModel.createUser(user);

  return createdUser;
};

module.exports = {
  createUser,
};
