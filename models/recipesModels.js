const { ObjectID } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  try {
    const connect = await connection('recipes');
    const recipeRegister = await connect.insertOne({ name, ingredients, preparation, userId });
    const { insertedId: _id } = recipeRegister;
    return { _id, name, ingredients, preparation, userId };
  } catch (error) {
    throw new Error('recipe register failed');
  }
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  try {
    const connect = await connection('recipes');
    const updateQuery = await connect.findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    );

    return updateQuery.value;
  } catch (error) {
    throw new Error('recipe not found');
  }
};

const deleteRecipe = async (id) => {
  try {
    const connect = await connection('recipes');
    const deleteQuery = await connect.findOneAndDelete({ _id: ObjectID(id) });

    return deleteQuery.value;
  } catch (error) {
    throw new Error('recipe not found');
  }
};

const getAllRecipes = async () => {
  try {
    const connect = await connection('recipes');
    const recipes = await connect.find().toArray();
    return recipes;
  } catch (error) {
    throw new Error('recipes search failed');
  }
};

const getRecipeById = async (id) => {
  try {
    const connect = await connection('recipes');
    const searchQuery = await connect.findOne({ _id: ObjectID(id) });

    return searchQuery;
  } catch (error) {
    throw new Error('recipe not found');
  }
};

module.exports = { createRecipe, updateRecipe, deleteRecipe, getAllRecipes, getRecipeById };
