const { Router } = require('express');
const routes = require('../routes');
const middlewares = require('../middlewares');

const recipes = Router();

recipes.route('/').post(middlewares.auth(), routes.newRecipe);

module.exports = recipes;
