const { Router } = require('express');
const routes = require('../routes');
const middlewares = require('../middlewares');

const recipes = Router();

recipes
  .route('/')
  .post(middlewares.auth(), routes.newRecipe)
  .get(middlewares.auth(false), routes.allRecipes);

module.exports = recipes;
