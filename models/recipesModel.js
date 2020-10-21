const { ObjectID } = require('mongodb');
const { handleConnect } = require('./connection');

const createRecipe = handleConnect('recipes');

module.exports = {
  createRecipe,
};
