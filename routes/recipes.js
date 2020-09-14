const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const { registerRecipe, listRecipes, findRecipeById, updateRecipe, deleteRecipe } = require('../recipes/recipeController');
const { recipe, token } = require('../middlewares/validate/index');

router
  .post('/', recipe.validateRecipe, token.validateToken, rescue(registerRecipe))
  .get('/', rescue(listRecipes))
  .get('/:id', rescue(findRecipeById))
  .put('/:id', token.validateToken, rescue(updateRecipe))
  .delete('/:id', token.validateToken, rescue(deleteRecipe));

module.exports = router;
