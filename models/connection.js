require('dotenv/config');

const { MongoClient } = require('mongodb');

const { MONGO_DB_URL, DB_NAME } = process.env;

const dbUrl = MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster';
const dbName = DB_NAME || 'Cookmaster';

const connect = () => MongoClient.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((connection) => connection.db(dbName));

module.exports = connect;
