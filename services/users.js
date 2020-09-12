const users = require('../models/users');
const { badRequest, conflict } = require('../MyErrors');

const setNewUser = async (name, email, password) => {
  if (!name || !email || !password) return badRequest('Invalid entries. Try again.');
  const valid = await users.findUserByEmail(email);
  if (valid !== null) return conflict('Email already registered');
  const infos = await users.setNewUser(name, email, password);
  return infos;
};

module.exports = {
  setNewUser,
};
