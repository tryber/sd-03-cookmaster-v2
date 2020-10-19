const { MongoClient } = require('mongodb');
require('dotenv/config');

const { MONGO_DB_URL, DB_NAME } = process.env;

const dbURL = MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster';
const dbName = DB_NAME || 'Cookmaster';

const connection = () =>
  MongoClient.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((connect) => connect.db(dbName))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;
