const { ObjectId } = require('mongodb');
const connection = require('./connect');

const findByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

const findById = async (id) =>
  connection().then((db) => db.collection('users').findOne(ObjectId(id)));

const registerUser = async (name, email, password) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }))
    .then(({ insertedId }) => ({ user: { name, email, password, role: 'user', _id: insertedId } }));

/* const editUser = async (id, email, password, name) =>
  connection().then((db) =>
    db
      .getTable('users')
      .update()
      .set('email', email)
      .set('password', password)
      .set('first_name', name)
      .where('id = :id')
      .bind('id', id)
      .execute(),
  ); */

module.exports = {
  findByEmail,
  findById,
  registerUser,
};
