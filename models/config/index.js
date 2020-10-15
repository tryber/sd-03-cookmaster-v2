const connection = require('../connection');

const connectCollumn = (collumn) =>
  connection().then((db) => db.collection(collumn));

const handleColumn = (collumn) => async (instance) =>
  connectCollumn(collumn)
    .then((table) => table.insertOne(instance))
    .then(({ insertedId }) => ({ _id: insertedId, ...instance }));

module.exports = {
  connectCollumn,
  handleColumn,
};
