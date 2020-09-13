const { connect } = require('./DbConnection');

const createRecipeModel = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const result = await db.collection('recipe').insertOne({ name, ingredients, preparation, userId });
  return result.ops;
};

module.exports = {
  createRecipeModel,
};
