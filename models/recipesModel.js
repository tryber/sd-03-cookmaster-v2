const connection = require('./connection');

const createRecipe = (name, ingredients, preparation, userId) =>
  connection()
    .then((db) => db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation }))
    .then(({ insertedId }) =>
      ({ _id: insertedId, name, ingredients, preparation, userId }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = {
  createRecipe,
};
