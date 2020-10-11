const connect = require('./connection');

const createRecipe = async ({ name, ingredients, preparation, id }) => connect()
  .then((db) => db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, id }))
  .then(({ insertedId }) => ({
    recipe: {
      name,
      ingredients,
      preparation,
      id,
      insertedId,
    },
  }));

module.exports = {
  createRecipe,
};
