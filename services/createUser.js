const models = require('../models');

const createUser = async (role, { name, email, password }) =>
  models.add({ name, email, password, role });

module.exports = createUser;
