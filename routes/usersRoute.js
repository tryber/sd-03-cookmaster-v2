const { Router } = require('express');
const rescue = require('express-rescue');

const { userValidation } = require('../middlewares');
const { userController } = require('../controllers');

const users = Router();

users.post('/', userValidation, rescue(userController.createUser));

module.exports = users;
