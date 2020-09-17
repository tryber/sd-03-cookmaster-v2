const recipeModel = require('../model/recipeModel');

const standarizedId = /^[0-9a-fA-F]{24}$/;

const invaliDataError = { err: {
  code: 'invalid_data',
  message: 'Wrong id format',
} };

const getAll = async () => recipeModel.listAll();

const getById = async (id) => {
  let result = '';
  if (standarizedId.test(id)) { result = await recipeModel.selectById(id); }

  return result || { message: 'recipe not found' };
}

const insertOne = async ({ name, ingredients, preparation }, uid) => {
  if (!name || !ingredients || !preparation) {
    return { message: 'Invalid entries. Try again.' };
  }
  return recipeModel.create(name, ingredients, preparation, uid);
};

const updateOne = async (uId, role, rId, name, ingredients, preparation) => {
  const recipe = await recipeModel.selectById(rId);
  console.log(recipe);
  // O id no mongo é armazenado no formato ObjectID, que é diferente de string
  return (uId.toString() === recipe.userId.toString() || role === 'admin') ?
  recipeModel.update(rId, name, ingredients, preparation) :
  { message: 'Forbidden.' };
};

const deleteOne = async (rId, uId, role) => {
  const recipe = await recipeModel.selectById(rId);

  if (!recipe) return { message: '404' };
  return (uId.toString() === recipe.userId.toString() || role === 'admin') ?
  recipeModel.erase(rId) :
  { message: 'Forbidden.' };
}

module.exports = {
  getAll,
  getById,
  insertOne,
  updateOne,
  deleteOne,
};
