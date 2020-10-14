const userModel = require('../models/userModel');

const createUser = async (name, email, password) => {
  const user = await userModel.createUser(name, email, password);
  return user;
};

module.exports = {
  createUser,
};
