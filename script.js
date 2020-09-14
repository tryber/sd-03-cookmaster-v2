const mongo = require('./model/connection');

const createAdminUser = async (name, email, password) => mongo.connect()
  .then((db) => db.collection('users')
  .insertOne({ name, email, password, role: 'admin' }))
  .then(({ insertedId }) => ({ user: { _id: insertedId, name, email, password, role: 'user' } }))
  .catch((error) => error);

createAdminUser('Marco Barbosa', 'marco.meireles.b@gmail.com', '123456')
.then(() => {
  console.log('Usuário criado');
  return process.exit(22);
})
.catch((error) => {
  console.log(error);
  return process.exit(404);
});
