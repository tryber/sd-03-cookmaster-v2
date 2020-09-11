const userServices = require('./userServices');

const { create: CreateUser, getUserByEmail: SearchByEmail } = userServices;

module.exports = {
  CreateUser,
  SearchByEmail,
};
