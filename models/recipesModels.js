const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userID) => {
  try {
    const connect = await connection('recipes');
    const recipeRegister = await connect.insertOne({ name, ingredients, preparation });
    const { insertedId: _id } = recipeRegister;
    return { _id, name, ingredients, preparation, userID };
  } catch (error) {
    throw new Error('recipe register failed');
  }
};

module.exports = { createRecipe };
