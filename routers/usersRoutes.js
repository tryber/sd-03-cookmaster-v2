const express = require('express');

const validateJWT = require('../middlewares/validateJWT');
const controllers = require('../controllers/index');

const usersRoutes = express.Router();

usersRoutes
  .post('/', controllers.userController.createUser)
  .post('/admin', validateJWT('missing auth token'), controllers.userController.createAdmin);

module.exports = {
  usersRoutes,
};
