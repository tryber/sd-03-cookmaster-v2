const { usersModel } = require('../models');
const { verifyUser } = require('../utils/verifyUser');

const addUser = async (data) => {
  const validation = await verifyUser(data);
  if (validation.error) return validation;
  const { name, email, password } = data;
  const createdUser = await usersModel.createUser(name, email, password);
  return createdUser;
};

module.exports = {
  addUser,
};
