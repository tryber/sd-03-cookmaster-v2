const recipesModel = require('./recipesModel');

const addRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await recipesModel.addRecipe(name, ingredients, preparation, userId);
  return { _id: recipe.insertedId, name, ingredients, preparation, userId };
};

const getAllRecipes = async () => recipesModel.getAllRecipes();

const getRecipeById = async (id) => recipesModel.getRecipeById(id);

const editRecipe = async (id, name, ingredients, preparation) => {
  await recipesModel.editRecipe(id, name, ingredients, preparation);
  return { _id: id, name, ingredients, preparation };
};

module.exports = { addRecipe, getAllRecipes, getRecipeById, editRecipe };
