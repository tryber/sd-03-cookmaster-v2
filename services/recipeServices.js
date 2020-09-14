const model = require('../model/model');
const userServices = require('./userServices');

const createNewRecipe = async (name, ingredients, preparation, userId) => {
  // regras de negócio
  const verify = userServices.entriesVerify(name, ingredients, preparation);
  if (verify) {
    return verify;
  }

  return model.createRecipe(name, ingredients, preparation, userId);
};

const getAllRecipes = async () => model.getAllRecipesFromDB();

const getRecipe = async (id) => model.getRecipeFromDB(id);

const updateRecipeService =
  async (id, userLoggedId, userLoggedRole, userIdRecipe, name, ingredients, preparation) => {
    // regras de negócio
    if (userLoggedRole === 'admin') {
      const result = await model.updateRecipe(id, name, ingredients, preparation);
      return result;
    }
    if (userLoggedId !== userIdRecipe) {
      return { message: 'Usuário não pode editar essa receita' };
    }
    const result = await model.updateRecipe(id, name, ingredients, preparation);
    return result;
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipeService,
};
