const model = require('./modelRecipes');
const { validateId } = require('../validation/validation');

async function createRecipes(name, ingredients, preparation, userId) {
  return model.createRecipes(name, ingredients, preparation, userId);
}

async function getRecipes() {
  return model.getRecipes();
}

async function getRecipesById(id) {
  const validate = validateId(id);
  const findRecipeById = await model.getRecipesById(id);
  console.log(findRecipeById, 'dins')

  if (validate) return { message: 'recipe not found' };
  if (!findRecipeById) return { message: 'recipe not found' };

  return findRecipeById;
}

// const verifyAdmin = (id) => {

// }

// async function updateRecipes(name, ingredients, preparation, id) {
//   if (id) 
// }

module.exports = {
  createRecipes,
  getRecipes,
  getRecipesById,
};
