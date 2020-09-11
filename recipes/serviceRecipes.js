const model = require('./modelRecipes');

async function createRecipes(name, ingredients, preparation, userId) {
  return model.createRecipes(name, ingredients, preparation, userId);
}

async function getRecipes() {
  return model.getRecipes();
}

async function getRecipesById(id) {
  return model.getRecipesById(id);
}

module.exports = {
  createRecipes,
  getRecipes,
  getRecipesById,
};
