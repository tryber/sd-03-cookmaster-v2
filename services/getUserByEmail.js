const models = require('../models');

const getUserByEmail = async (email) => models.getUser({ email });

module.exports = getUserByEmail;
