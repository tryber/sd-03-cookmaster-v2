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
  const recipes = await db.collection('recipes').find();
  return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
