const connect = require('./connect');

const newRecipe = async (recipeObj) => {
  const db = await connect();
  const insertedRecipe = await db.collection('recipes')
    .insertOne(recipeObj);

  return { recipe: insertedRecipe.ops[0] };
};

module.exports = {
  newRecipe,
};
