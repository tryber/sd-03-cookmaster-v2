const { connect } = require('./models/connection');

connect()
  .then((db) => db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }));
