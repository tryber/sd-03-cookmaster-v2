const userModel = require('../models/UserModel');

const createUserService = async (name, email, password) => {
  const userInfo = { name, email, password };
  const createUser = await userModel.createUserModel(userInfo);
  console.log(createUser);
  return createUser;
};

module.exports = {
  createUserService,
};
