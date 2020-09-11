const { ObjectId } = require('mongodb');
const connection = require('./connect');

const getAll = async () => connection().then((db) => db.collection('recipes').find({}).toArray());

const findRecipeById = async (id) =>
  connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));
/* 
const findRecipesByQuery = async (search) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .where('name like :name')
        .bind('name', `%${search}%`)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    ); */

const createNewRecipe = async (name, ingredients, preparation, userId) =>
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
      })),
  );

const editRecipe = async (id, name, ingredients, preparation, userId) =>
  connection()
    .then((db) =>
      db
        .collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }),
    )
    .then(() => ({
      _id: id,
      name,
      ingredients,
      preparation,
      userId,
    }));

/* const findRecipesByUserId = async (userId) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .where('user_id = :user_id')
        .bind('user_id', userId)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([recipeId, user, name]) => ({
        id: recipeId,
        user,
        name,
      })),
    );
 */
/* const deleteRecipe = async (id) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .delete()
      .where('id = :id')
      .bind('id', id)
      .execute(),
  ); */

module.exports = {
  getAll,
  findRecipeById,
  createNewRecipe,
  editRecipe,
};
