const { ObjectId } = require('mongodb');
const connection = require('./connect');

const getAllRecipes = async () =>
  connection().then((db) => db.collection('recipes').find({}).toArray());

const getRecipeById = async (id) =>
  connection().then((db) => {
    if (!ObjectId.isValid(id)) return null;
    return db.collection('recipes').findOne(ObjectId(id));
  });

const createRecipe = async (name, ingredients, preparation, userId) =>
  connection().then((db) =>
    db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId })
      .then(({ insertedId }) => ({
        name,
        ingredients,
        preparation,
        userId,
        _id: insertedId,
      })));

const editRecipe = async (id, name, ingredients, preparation, userId) =>
  connection()
    .then((db) =>
      db
        .collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }))
    .then(() => ({
      _id: id,
      name,
      ingredients,
      preparation,
      userId,
    }));

const deleteRecipe = async (id) =>
  connection().then((db) => db.collection('recipe').deleteOne({ _id: ObjectId(id) }));

const addImageToRecipe = async (id, image, initialState) =>
  connection()
    .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } }))
    .then(() => ({ ...initialState, image }));

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  addImageToRecipe,
};
