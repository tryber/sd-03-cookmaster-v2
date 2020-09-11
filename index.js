const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Controllers = require('./controllers');
const Middlewares = require('./middlewares');

mongoose.connect('mongodb://localhost:27017/Cookmaster', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.post('/users', Middlewares.validade.user, Controllers.users.createUser);
app.post('/login', Middlewares.validade.login, Controllers.users.loginUser);
app.post('/recipes', Middlewares.validade.recipes, Middlewares.validade.validateToken, Controllers.recipes.createRecipes);

app.put('/recipes/:id', Middlewares.validade.recipes, Middlewares.validade.validateToken, Controllers.recipes.updateRecipe);
app.delete('/recipes/:id', Middlewares.validade.validateToken, Controllers.recipes.deleteRecipe);

app.get('/recipes', Controllers.recipes.listRecipes);
app.get('/recipes/:id', Controllers.recipes.getRecipe);

app.use(Middlewares.error);

app.listen(3000, () => console.log('listen to port 3000'));
