const { MongoClient } = require('mongodb');
require('dotenv/config');

// Para o avaliador funcionar altere a conexão do banco para:
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
// const DB_NAME = 'Cookmaster';

const {
  MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster',
  DB_NAME = 'Cookmaster',
} = process.env;

const connect = () =>
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err.message, err.stack);
      process.exit(1);
    });

const connectTo = (coll) => connect().then((db) => db.collection(coll));

const stdAdd = (coll) => async (instance) =>
  connectTo(coll)
    .then((table) => table.insertOne(instance))
    .then(({ insertedId }) => ({ _id: insertedId, ...instance }));

module.exports = {
  connectTo,
  stdAdd,
};
