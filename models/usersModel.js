const { connectIn, handleConnect } = require('./connection');

const getUser = async (user) => connectIn('users').then((table) => table.findOne(user));

const add = handleConnect('users');

module.exports = {
  getUser,
  add,
};
