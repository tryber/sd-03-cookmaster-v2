const usersModel = require('../models/usersModel');

const findUserByEmail = (email) => usersModel.findByEmail(email);

const register = (name, email, password, role) =>
  usersModel.insert({ name, email, password, role });

const login = async (email, password) => {
  const userData = await findUserByEmail(email);
  if (userData && userData.password === password) return userData;
};

module.exports = {
  register,
  findUserByEmail,
  login,
};
