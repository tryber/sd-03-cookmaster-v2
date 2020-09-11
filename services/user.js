const UserModel = require('../models/user');

async function createUser(data) {
  return UserModel.createUser({ ...data, role: 'user' });
}

async function createAdmin(data) {
  return UserModel.createUser({ ...data, role: 'admin' });
}

module.exports = { createUser, createAdmin };
