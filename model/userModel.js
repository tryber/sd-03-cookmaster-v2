const connection = require('./connection');
// const { ObjectId } = require('mongodb');

//* Função de criar usuário

const createUser = async (name, email, password, role = 'user') =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then((result) => ({ name, email, password, role, _id: result.insertedId }));

//* Verifica e-mail

const findEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

//* Localizar por e-mail e senha

const emailPass = async (email, password) =>
  connection().then((db) => db.collection('users').findOne({ email, password }));

module.exports = {
  createUser,
  findEmail,
  emailPass,
};
