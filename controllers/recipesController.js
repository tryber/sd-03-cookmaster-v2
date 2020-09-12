const { Router } = require('express');
const routes = require('../routes');
const middlewares = require('../middlewares');

const recipes = Router();

recipes
  .route('/')
  .post(middlewares.auth(), routes.newRecipe)
  .get(middlewares.auth(false), routes.allRecipes);

recipes
  .route('/:id')
  .get(middlewares.auth(false), routes.getRecipe)
  .put(middlewares.auth(), routes.modifyRecipe)
  .delete(middlewares.auth(), routes.deleteRecipe);

recipes.route('/:id/image').put(middlewares.auth(), middlewares.upload);

module.exports = recipes;
