require('dotenv/config');
const MongoClient = require('mongodb').MongoClient;

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const DB_NAME = process.env.DB_NAME;

const connection = () => MongoClient.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.log('XXXXXX', MONGO_DB_URL);
    console.error(err.message, err.stack);
    process.exit(1);
  });


module.exports = connection;
