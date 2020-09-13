const { connect } = require('./DbConnection');

const createRecipeModel = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const result = await db.collection('recipe').insertOne({ name, ingredients, preparation, userId });
  const recipesList = result.ops[0];
  const recipe = { recipe: recipesList };
  return recipe;
};

module.exports = {
  createRecipeModel,
};
