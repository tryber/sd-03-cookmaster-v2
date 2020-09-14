const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./users/controllerUsers');
const recipesController = require('./recipes/controllerRecipes');

const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => response.send());
app.use('/', usersController);
app.use('/recipes', recipesController);

app.listen(3000, () => console.log('Welcome 3000'));
