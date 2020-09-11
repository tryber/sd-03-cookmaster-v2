const connection = require('../models/connection');
// const { ObjectID } = require('mongodb');

const addUser = async (name, email, password, role) => {
  const db = await connection();
  return db.collection('users').insertOne({ name, email, password, role });
};

const getUserByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

module.exports = { addUser, getUserByEmail };
