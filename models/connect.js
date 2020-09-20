const { MongoClient } = require('mongodb');
/* require('dotenv/config');

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// para rodar localmente os testes
const user = encodeURIComponent(DB_USER);
const password = encodeURIComponent(DB_PASSWORD);
const authMechanism = 'DEFAULT';

const MONGO_DB_URL = `mongodb://${user}:${password}@localhost:27017/?authMechanism=${authMechanism}`; */

// para rodar na pipeline github Trybe
const dbURL = 'mongodb://mongodb:27017/Cookmaster';
const dbName = 'Cookmaster';

const connect = () =>
  MongoClient.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((connection) => connection.db(dbName))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connect;
