const usersModel = require('../models/usersModel');

const findUserByEmail = async (email) => {
  return await usersModel.findByEmail(email);
};

const register = async (name, email, password, role) => {
  const response = await usersModel.insert({ name, email, password, role });
  return response;
};

const login = async (email, password) => {
  const userData = await findUserByEmail(email);
  if (userData && userData.password === password) return userData;
  return;
};

module.exports = {
  register,
  findUserByEmail,
  login,
};
