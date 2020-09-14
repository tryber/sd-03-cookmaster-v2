const recipeModel = require('../model/recipeModel');
const usersModel = require('../model/usersModel');

const getAll = async () => recipeModel.listAll();
const getById = async (id) => recipeModel.selectById(id);
const deleteOne = async (id) => recipeModel.erase(id);

// Regras de negócio
const insertOne = async ({name, ingredients, preparation}, uid) => {
  if (!name || !ingredients || !preparation)
    return { message: "Invalid entries. Try again." }
  return recipeModel.create(name, ingredients, preparation, uid);
}

const updateOne = async (uId, role, rId, name, ingredients, preparation) => {
  const [ recipe ] = await recipeModel.selectById(rId);

  // Some high-IQ dude managed to find that out...
  return (uId.toString() === recipe.userId.toString() || role === 'admin') ?
  recipeModel.update(rId, name, ingredients, preparation) :
  { message: "Forbidden." };
}

module.exports = {
  getAll,
  getById,
  insertOne,
  updateOne,
  deleteOne,
};
