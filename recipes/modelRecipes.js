const connect = require('../users/connection');

const createRecipes = async (name, ingredients, preparation, userId) => connect()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
  .then(({ insertedId }) => ({ name, ingredients, preparation, userId, _id: insertedId }));

module.exports = {
  createRecipes,
};
