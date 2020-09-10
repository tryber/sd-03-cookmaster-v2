const connect = require('./connection');
const { ObjectId } = require('mongodb');
const { response } = require('express');

const insert = async (recipeData) => {
  try {
    const db = await connect();
    const response = await db.collection('recipes').insertOne(recipeData);
    const { name, ingredients, preparation, userId } = recipeData;
    return {
      name,
      ingredients,
      preparation,
      userId,
      _id: response.insertedId,
    };
  } catch (err) {
    throw new Error(err);
  }
};

const getAll = async () => {
  const db = await connect();
  return db.collection('recipes').find({}).toArray();
};

const getRecipeById = async (id) => {
  const db = await connect();
  return db.collection('recipes').find(ObjectId(id)).toArray();
};

const update = async (id, body) => {
  const db = await connect();
  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: body });
  return getRecipeById(id);
};

const remove = async (_id) => {
  const db = await connect();
  const removed = await db.collection('recipes').deleteOne({ _id: ObjectId(_id) });
  return removed.result.ok;
};

module.exports = {
  insert,
  getAll,
  getRecipeById,
  update,
  remove,
};
