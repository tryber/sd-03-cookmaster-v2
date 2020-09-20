const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const { registerRecipe, listRecipes, findRecipeById, updateRecipe, deleteRecipe } = require('../recipes/recipeController');
const { recipe, token } = require('../middlewares/validate/index');
const { upload, update } = require('../recipes/uploadImage');

router
  .put('/:id/image', token.validateToken, rescue(upload), rescue(update))
  .post('/', recipe.validateRecipe, token.validateToken, rescue(registerRecipe))
  .get('/', rescue(listRecipes))
  .get('/:id', rescue(findRecipeById))
  .put('/:id', token.validateToken, rescue(updateRecipe))
  .delete('/:id', token.validateToken, rescue(deleteRecipe));

module.exports = router;
