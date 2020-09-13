const { connect } = require('./connection');

const setNewRecipe = async (name, ingredients, preparation, userId) =>
  connect()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }))
    .then(({ insertedId }) =>
      ({ recipe: { name, ingredients, preparation, userId, _id: insertedId } }));

const findAllRecipes = async () =>
  connect()
    .then((db) => db.collection('recipes').find({}).toArray());

module.exports = {
  setNewRecipe,
  findAllRecipes,
};
