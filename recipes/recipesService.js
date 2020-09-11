const recipesModel = require('./recipesModel');

const addRecipe = async (name, ingredients, preparation) => {
  const recipe = await recipesModel.addRecipe(name, ingredients, preparation);
  return { _id: recipe.insertedId, name, ingredients, preparation };
};

module.exports = { addRecipe };
