const model = require('./modelRecipes');

async function createRecipes(name, ingredients, preparation, userId) {
  return model.createRecipes(name, ingredients, preparation, userId);
}

module.exports = {
  createRecipes,
};
