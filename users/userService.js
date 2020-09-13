const jwt = require('jsonwebtoken');
const Model = require('./userModel');

const createUser = async (data) => {
  const user = await Model.createUser(data);
  return user;
};

const createToken = async (data) => {
  const token = jwt.sign(data, 'htop');
  return token;
};

module.exports = { createUser, createToken };
