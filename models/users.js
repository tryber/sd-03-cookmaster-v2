const { connectTo, stdAdd } = require('./connect');

const getUser = async (userObj) => connectTo('users').then((table) => table.findOne(userObj));

const add = stdAdd('users');

module.exports = {
  getUser,
  add,
};
