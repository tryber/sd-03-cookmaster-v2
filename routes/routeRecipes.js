const express = require('express');

const index = require('../controllers');
const middlewares = require('../middlewares/index');

const router = express.Router();

router.post('/', middlewares.auth, index.recipesController.setNewRecipe);

module.exports = router;
