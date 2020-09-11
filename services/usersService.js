const { usersModel } = require('../models');

const addUser = async (data) => {
  const { name, email, password } = data;
  const createdUser = await usersModel.createUser(name, email, password);
  return createdUser;
};

module.exports = {
  addUser,
};
