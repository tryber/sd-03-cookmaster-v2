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

module.exports = {
  newRecipe,
  getAllRecipes,
};
