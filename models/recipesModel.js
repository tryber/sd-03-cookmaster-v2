const { ObjectId } = require('mongodb');
const { connect } = require('./DbConnection');

const createRecipeModel = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const result = await db.collection('recipes').insertOne({ name, ingredients, preparation, userId });
  const recipesList = result.ops[0];
  const recipes = { recipe: recipesList };
  return recipes;
};

const listRecipesModel = async () => {
  const db = await connect();
  const result = await db.collection('recipes').find({}).toArray();
  return result;
};

const RecipeByIdModel = async (id) => {
  const db = await connect();
  const result = await db.collection('recipes').findOne(ObjectId(id));
  return result;
};

const RecipeEditModel = async (id, name, ingredients, preparation, userId) => connect()
  .then((db) =>
    db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } }))
  .then(() => ({ name, ingredients, preparation, userId }));

module.exports = {
  createRecipeModel,
  listRecipesModel,
  RecipeByIdModel,
  RecipeEditModel,
};
