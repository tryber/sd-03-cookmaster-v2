const express = require('express');
const bodyParser = require('body-parser');
const { usersController, recipesController } = require('./controllers');
const { verifyUser, authLogin, verifyRecipe, authToken } = require('./middlewares');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', verifyUser, usersController.newUser);

app.post('/login', authLogin);

app.post('/recipes', verifyRecipe, authToken, recipesController.newRecipe);

app.get('/recipes', recipesController.showAllRecipes);
