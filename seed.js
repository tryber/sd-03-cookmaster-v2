const { connect } = require('./models/connection');

const db = connect()
  .then((database) => database);

db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
