const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./users/controllerUsers');
const recipesController = require('./recipes/controllerRecipes');
const { userAuth } = require('./middlewares/userAuthentication');

const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => response.send());

app.post('/users', usersController);
app.post('/login', usersController);

app.post('/recipes', recipesController);
app.get('/recipes', recipesController);
app.get('/recipes/:id', recipesController);

app.listen(3000, () => console.log('Welcome 3000'));
