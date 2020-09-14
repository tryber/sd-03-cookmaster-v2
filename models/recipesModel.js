const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  let newRecipe = await db.collection('recipes')
    .insertOne({
      name,
      ingredients,
      preparation,
      userId,
    });
  const { insertedId } = newRecipe;
  newRecipe = {
    recipe: {
      _id: insertedId,
      name,
      ingredients,
      preparation,
      userId,
    },
  };
  return newRecipe;
};

const getAllRecipes = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  const db = await connect();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));
  return recipe;
};

const updateRecipe = async (id, userId, name, ingredients, preparation) => {
  const db = await connect();
  let recipe = await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  recipe = {
    _id: id,
    name,
    ingredients,
    preparation,
    userId,
  };
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
