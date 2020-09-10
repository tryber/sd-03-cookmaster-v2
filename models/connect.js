require('dotenv/config');
const MongoClient = require('mongodb').MongoClient;

const { MONGO_URL, DB_NAME } = process.env;

const connect = () =>
  MongoClient.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err.message, err.stack);
      process.exit(1);
    });

const connectTo = (coll) => connect().then((db) => db.collection(coll));

module.exports = connectTo;
