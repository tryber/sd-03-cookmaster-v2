const userModel = require('../models/UserModel');

const createUserService = async (name, email, password) => {
  const userInfo = { name, email, password };
  if (name === undefined) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }

  if (email === undefined) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }

  if (password === undefined) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }
  const createUser = await userModel.createUserModel(userInfo);
  return createUser;
};

module.exports = {
  createUserService,
};
