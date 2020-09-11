const mongoClient = require('mongodb').MongoClient;
require('dotenv/config');

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster';

const createUniqueIndex = (collection, field) =>
  new Promise((resolve, reject) =>
    collection.createIndex(field, { unique: true }, (err) =>
      (err ? reject() : resolve())));

const connection = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async (conn) => {
      const db = conn.db('Cookmaster');
      const users = db.collection('users');
      await createUniqueIndex(users, { email: 1 });
      return db;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;
