const { ObjectId } = require('mongodb');
const connect = require('./connect');

const newRecipe = async (recipeObj) => {
  const db = await connect();
  const insertedRecipe = await db.collection('recipes')
    .insertOne(recipeObj);

  return { recipe: insertedRecipe.ops[0] };
};

const getAllRecipes = async () => {
  const db = await connect();

  const allRecipes = await db.collection('recipes')
    .find({}).toArray();

  return allRecipes;
};

const getRecipeById = async (id) => {
  const db = await connect();
  const recipe = await db.collection('recipes')
    .findOne(ObjectId(id));

  return recipe;
};

const updateRecipe = async (id, { name, ingredients, preparation }) => {
  const db = await connect();
  const updatedRecipe = await db.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    );

  return updatedRecipe.value;
};

const deleteRecipe = async (id) => {
  const db = await connect();
  const deletedRecipe = await db.collection('recipes')
    .findOneAndDelete(
      { _id: ObjectId(id) },
    );

  return deletedRecipe;
};

const updateRecipeImage = async (id, path) => {
  const db = await connect();
  const recipe = await db.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { image: path } },
      { returnOriginal: false },
    );

  return recipe.value;
};

module.exports = {
  newRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateRecipeImage,
};
