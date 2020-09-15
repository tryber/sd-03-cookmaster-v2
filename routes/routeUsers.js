const express = require('express');

const index = require('../controllers');
const middlewares = require('../middlewares/index');

const router = express.Router();

router.post('/', index.usersController.setNewUser);
router.post('/admin', middlewares.authAdmin, index.usersController.setNewAdmin);

module.exports = router;
