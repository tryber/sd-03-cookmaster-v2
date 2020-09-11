const { connect } = require('./DbConnection');

const createUserModel = ({ nameP, emailP, passwordP }) => {
  connect()
    .then((db) => db.collection('users').insertOne({ name: nameP, email: emailP, password: passwordP, role: 'user' }))
    .then((db) => db.collection('users').find({ name: nameP }));
};

module.exports = {
  createUserModel,
};
