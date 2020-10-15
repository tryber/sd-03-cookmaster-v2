const models = require('../models');

const getRecipes = () => models.getAllRecipes();

module.exports = getRecipes;
