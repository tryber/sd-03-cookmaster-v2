const { connect } = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => connect()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }))
  .then(({ insertedId }) => ({
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: insertedId,
    },
  }));

module.exports = {
  createRecipe,
};
