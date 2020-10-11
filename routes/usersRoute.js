const { Router } = require('express');
const rescue = require('express-rescue');

const { userCreateValidation } = require('../middlewares');
const { userController } = require('../controllers');

const users = Router();

users.post('/', userCreateValidation, rescue(userController.createUser));

module.exports = users;
