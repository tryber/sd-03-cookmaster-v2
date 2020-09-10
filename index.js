const express = require('express');
const controllers = require('./controllers');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/users', controllers.userController);
app.use('/login', controllers.loginController);
app.use('/recipes', controllers.recipesController);

app.get('/', (request, response) => {
  response.send();
});

app.use((error, _req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Error interno';

  res.status(status).json({ message });
  if (!error) next();
});

app.listen(3000, () => console.log('App rodando na porta 3000'));
