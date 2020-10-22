const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', controllers.users);
app.use('/login', controllers.login);
app.use('/recipes', controllers.recipes);

app.listen(3000, () => {
  console.log('server online');
});
