const userServices = require('./userServices');

const { create: CreateUser } = userServices;

module.exports = {
  CreateUser,
};
