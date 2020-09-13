const express = require('express');

const index = require('../controllers');
const middlewares = require('../middlewares/index');

const router = express.Router();

router.post('/', middlewares.auth, index.recipesController.setNewRecipe);
router.get('/', index.recipesController.findAllRecipes);
router.get('/:id', index.recipesController.findRecipesById);

module.exports = router;
