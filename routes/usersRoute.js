const { Router } = require('express');
const rescue = require('express-rescue');

const { userCreateValidation, authMiddleware } = require('../middlewares');
const { userController } = require('../controllers');

const users = Router();

users.post('/', userCreateValidation, rescue(userController.createUser));

users.post('/admin', userCreateValidation, authMiddleware(), rescue(userController.createAdmin));

module.exports = users;
