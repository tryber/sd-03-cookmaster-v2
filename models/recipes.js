const { connect } = require('./connection');

const setNewRecipe = async (name, ingredients, preparation, userId) =>
  connect()
    .then((db) => db.collection('users')
      .insertOne({ name, ingredients, preparation, userId }))
    .then(({ insertedId }) =>
      ({ recipe: { name, ingredients, preparation, userId, _id: insertedId } }));

module.exports = {
  setNewRecipe,
};
