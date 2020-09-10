const connectTo = require('./connect');

const createRecipe = async ({ name, ingredients, preparation, userId }) =>
  connectTo('recipes')
    .then((table) => table.insertOne({ name, ingredients, preparation, userId }))
    .then(({ insertedId }) => ({ _id: insertedId, name, ingredients, preparation, userId }));

module.exports = {
  createRecipe,
};
