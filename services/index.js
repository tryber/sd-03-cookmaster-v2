const userServices = require('./userServices');

const {
  create: CreateUser,
  getUserByEmail: SearchByEmail,
  getUserById: SearchUserByID,
} = userServices;

module.exports = {
  CreateUser,
  SearchByEmail,
  SearchUserByID,
};
