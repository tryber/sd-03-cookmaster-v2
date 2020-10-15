const connection = require('./connection');

const createRecipe = () => async (instance) =>
  connection('recipes')
    .then((table) => table.insertOne(instance))
    .then(({ insertedId }) => ({ _id: insertedId, ...instance }));

module.exports = createRecipe;
