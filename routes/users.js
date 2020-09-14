const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const { registerUser } = require('../users/userController');
const validate = require('../middlewares/validate/index');

router.post('/', validate.user.validateUserSingup,
  rescue(registerUser));

module.exports = router;
