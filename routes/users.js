const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const { registerUser } = require('../users/userController');
const validateUserModel = require('../middlewares/Validators/Users/validateUser');

router.post('/', validateUserModel, rescue(registerUser));

module.exports = router;
