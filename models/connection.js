require('dotenv/config');
const { MongoClient } = require('mongodb');

const {
  MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster',
  DB_NAME = 'Cookmaster',
} = process.env;

const connection = () =>
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((connect) => connect.db(DB_NAME))
    .catch((err) => {
      console.error(err.message, err.stack);
      process.exit(1);
    });

const connectIn = (collumn) => connection().then((db) => db.collection(collumn));

const handleConnect = (collumn) => async (instance) =>
  connectIn(collumn)
    .then((table) => table.insertOne(instance))
    .then(({ insertedId }) => ({ _id: insertedId, ...instance }));

module.exports = {
  connectIn,
  handleConnect,
};
