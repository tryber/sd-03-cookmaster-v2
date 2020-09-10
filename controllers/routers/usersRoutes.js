const express = require('express');
const controllers = require('../index');

const usersRoutes = express.Router();

usersRoutes
  .post('/', controllers.userController.createUser);

module.exports = {
  usersRoutes,
};
