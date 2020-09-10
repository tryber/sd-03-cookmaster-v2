const connectTo = require('./connect');

const createRecipe = async ({ name, ingredients, preparation, userId }) =>
  connectTo('recipes')
    .then((table) => table.insertOne({ name, ingredients, preparation, userId }))
    .then(({ insertedId }) => ({ _id: insertedId, name, ingredients, preparation, userId }));

const getAllRecipes = async () => connectTo('recipes')
  .then((table) => table.find().toArray());

const getRecipe = async (searchObj) => connectTo('recipes')
  .then((table) => table.findOne(searchObj));

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipe,
};
