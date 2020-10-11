const { Router } = require('express');
const rescue = require('express-rescue');

const { authMiddleware, recipeValidation } = require('../middlewares');
const { recipesController } = require('../controllers');

const recipe = Router();

recipe.get('/', rescue(recipesController.getAllRecipes));

recipe.post('/', authMiddleware, recipeValidation, rescue(recipesController.createRecipe));

module.exports = recipe;
