const users = require('../models/users');
const { badRequest, conflict } = require('../MyErrors');

const emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const setNewUser = async (name, email, password) => {
  if (!name || !email || !emailRegx.test(email) || !password) return badRequest('Invalid entries. Try again.');
  const valid = await users.findUserByEmail(email);
  if (valid !== null) return conflict('Email already registered');
  const infos = await users.setNewUser(name, email, password);
  return infos;
};

module.exports = {
  setNewUser,
};
