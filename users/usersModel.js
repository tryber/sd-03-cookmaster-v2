const { ObjectID } = require('mongodb');
const connection = require('../models/connection');

const addUser = async (name, email, password, role) => {
  const db = await connection();
  return db.collection('users').insertOne({ name, email, password, role });
};

const getUserByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

const getUserById = async (id) =>
  connection().then((db) => db.collection('users').findOne(ObjectID(id)));

module.exports = { addUser, getUserByEmail, getUserById };
