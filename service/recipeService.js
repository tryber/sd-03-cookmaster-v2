const recipeModel = require('../model/recipeModel');
const { validateRecipe, messages, codes } = require('./error');

const newRecipe = async(name, ingredients, preparation, userId) => {
  //* Validações
  const valid = validateRecipe(name, ingredients, preparation);
  if (valid.code) return (valid);

  //* Cadastramento da receita no mongoDB:
  const recipe = await recipeModel.newRecipe(name, ingredients, preparation, userId);
  return { recipe };
};

module.exports = {
  newRecipe,
};
