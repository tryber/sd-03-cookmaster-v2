const usersModel = require('./usersModel');

const addUser = async (name, email, password, role) => {
  const user = await usersModel.addUser(name, email, password, role);
  return { _id: user.insertedId, name, email, role };
};

const findUserByEmail = async (email) => {
  const user = await usersModel.getUserByEmail(email);
  return user;
};

module.exports = { addUser, findUserByEmail };
