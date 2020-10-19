const { Router } = require('express');
const rescue = require('express-rescue');

const { userLoginValidation } = require('../middlewares');
const { userController } = require('../controllers');

const login = Router();

login.post('/', userLoginValidation, rescue(userController.login));

module.exports = login;
