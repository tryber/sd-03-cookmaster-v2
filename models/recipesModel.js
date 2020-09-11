const connect = require('./connection');

const createRecipe = async (name, ingredients, preparation) => {
  const db = await connect();
  let newRecipe = await db.collection('users')
    .insertOne({
      name,
      ingredients,
      preparation,
    });
  const { insertedId } = newRecipe;
  newRecipe = {
    recipe: {
      _id: insertedId,
      name,
      ingredients,
      preparation,
    },
  };
  return newRecipe;
};

module.exports = {
  createRecipe,
};
