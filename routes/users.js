const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const { registerUser, registerAdmin } = require('../users/userController');
const validate = require('../middlewares/validate/index');

router
  .post('/', validate.user.validateUserSingup,
    rescue(registerUser))
  .post('/admin', validate.token.validateToken, validate.user.validateUserSingup, rescue(registerAdmin));
module.exports = router;
