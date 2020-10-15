const { connectCollumn } = require('./connection');

const getUser = async (userObj) => connectCollumn('users').then((table) => table.findOne(userObj));

module.exports = getUser;
