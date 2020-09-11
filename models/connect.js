require('dotenv/config');
const MongoClient = require('mongodb').MongoClient;

const { MONGO_DB_URL, DB_NAME =  } = process.env;

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

const stdAdd = (coll) => async (instance) => connectTo(coll)
  .then((table) => table.insertOne(instance))
  .then(({ insertedId }) => ({ _id: insertedId, ...instance }));

module.exports = {
  connectTo,
  stdAdd,
};
