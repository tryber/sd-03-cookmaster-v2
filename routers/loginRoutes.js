const express = require('express');
const controllers = require('../controllers/index');

const loginRoutes = express.Router();

loginRoutes
  .post('/', controllers.loginController.login);

module.exports = {
  loginRoutes,
};
