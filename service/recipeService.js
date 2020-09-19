const recipeModel = require('../model/recipeModel');

const standarizedId = /^[0-9a-fA-F]{24}$/;

const getAll = async () => recipeModel.listAll();

const getById = async (id) => {
  let result = '';
  if (standarizedId.test(id)) { result = await recipeModel.selectById(id); }

  return result || { message: 'recipe not found' };
};

const insertOne = async ({ name, ingredients, preparation }, uid) => {
  return (!name || !ingredients || !preparation) ?
  { message: 'Invalid entries. Try again.' } :
  recipeModel.create(name, ingredients, preparation, uid);
};

const updateOne = async (uId, role, rId, name, ingredients, preparation) => {
  const recipe = await recipeModel.selectById(rId);

  // O id no mongo é armazenado no formato ObjectID, que é diferente de string
  return (uId.toString() === recipe.userId.toString() || role === 'admin') ?
  recipeModel.update(rId, name, ingredients, preparation) :
  { message: 'Forbidden.' };
};

const setImage = async (id, imagePath) => {
  const recipe = await recipeModel.selectById(id);

  return (uId.toString() === recipe.userId.toString() || role === 'admin') ?
  recipeModel.setImagePath(id, recipe, imagePath) :
  { message: 'Forbidden.' };
};

const deleteOne = async (rId, uId, role) => {
  const recipe = await recipeModel.selectById(rId);

  if (!recipe) return { message: '404' };
  return (uId.toString() === recipe.userId.toString() || role === 'admin') ?
  recipeModel.erase(rId) :
  { message: 'Forbidden.' };
};

module.exports = {
  getAll,
  getById,
  insertOne,
  updateOne,
  // setImage,
  deleteOne,
};
