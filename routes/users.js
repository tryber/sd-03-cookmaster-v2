const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const { registerUser } = require('../users/userController');
const { validateUserSingup } = require('../middlewares/validade/validateUser');

router.post('/', validateUserSingup, rescue(registerUser));

module.exports = router;
