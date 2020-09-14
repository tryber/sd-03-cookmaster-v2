const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const { registerRecipe, listRecipes, findRecipeById } = require('../recipes/recipeController');
const { recipe, token } = require('../middlewares/validate/index');

router
  .post('/', recipe.validateRecipe, token.validateToken, rescue(registerRecipe))
  .get('/', rescue(listRecipes))
  .get('/:id', rescue(findRecipeById));

module.exports = router;
