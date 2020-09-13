const { connect } = require('./DbConnection');

const createRecipeModel = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const result = await db.collection('recipes').insertOne({ name, ingredients, preparation, userId });
  const recipesList = result.ops[0];
  const recipe = { recipe: recipesList };
  return recipe;
};

const listRecipesModel = async () => {
  const db = await connect();
  const result = await db.collection('recipes').find({}).toArray();
  return result;
};

module.exports = {
  createRecipeModel,
  listRecipesModel,
};
