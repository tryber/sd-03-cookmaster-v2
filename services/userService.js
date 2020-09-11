const userModel = require('../models/userModel');

const createUser = async (name, email, password, user) => {
  const registerUser = await userModel.createUser(name, email, password, user);
  return registerUser;
};

module.exports = { createUser };
