const express = require('express');
const controllers = require('../controllers/index');
const validateJWT = require('../middlewares/validateJWT');

const recipesRoutes = express.Router();

recipesRoutes
  .post('/', validateJWT('jwt malformed'), controllers.recipesController.newRecipe)
  .get('/:id', controllers.recipesController.getRecipeById)
  .put('/:id', validateJWT('missing auth token'), controllers.recipesController.updateRecipe)
  .delete('/:id', validateJWT('missing auth token'), controllers.recipesController.deleteRecipe)
  .get('/', controllers.recipesController.getAllRecipes);

module.exports = {
  recipesRoutes,
};
