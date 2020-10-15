const connection = require('./connection');

const add = (x) => async (instance) =>
  connection(x)
    .then((table) => table.insertOne(instance))
    .then(({ insertedId }) => ({ _id: insertedId, ...instance }));

module.exports = add;
