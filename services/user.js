const UserModel = require('../models/user');

async function createUser(data, role = 'user') {
  return UserModel.createUser({ ...data, role });
}

module.exports = { createUser };
