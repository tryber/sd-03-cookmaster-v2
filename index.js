const express = require('express');
const bodyParser = require('body-parser');
const { userController, recipesController } = require('./controllers');
const { userValidate, loginValidate, recipeValidate } = require('./middlewares/validateData');
const authMiddleware = require('./middlewares/authentication');

const app = express();

app.use(bodyParser.json());

app.post('/users', userValidate, userController.registerUser);
app.post('/login', loginValidate, userController.loginUser);

app.post('/recipes', authMiddleware, recipeValidate, recipesController.registerRecipes);
app.get('/recipes', recipesController.listRecipes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('App listening on port 3000!'));
