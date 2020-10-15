const { connectCollumn } = require('./config');

const getUser = async (userObj) => connectCollumn('users').then((table) => table.findOne(userObj));

module.exports = getUser;
