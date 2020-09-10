const express = require('express');
const controllers = require('../controllers/index');

const usersRoutes = express.Router();

usersRoutes
  .post('/', controllers.userController.createUser);

module.exports = {
  usersRoutes,
};
