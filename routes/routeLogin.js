const express = require('express');

const index = require('../controllers');

const router = express.Router();

router.post('/', index.usersController.findUser);

module.exports = router;
