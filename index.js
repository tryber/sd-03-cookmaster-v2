const express = require('express');
const bodyParser = require('body-parser');
const login = require('./controllers');
const { userController, recipesController } = require('./controllers');

const app = express();
app.use(bodyParser({ extended: true }));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/login', login.login.login);

app.use('/users', userController);

app.use('/recipes', recipesController);

app.listen(3000, () => console.log('iniciando Servidor !'));
