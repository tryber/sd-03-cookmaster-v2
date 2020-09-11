const express = require('express');
const bodyParser = require('body-parser');
const { userController, recipesController } = require('./controllers');
const { userValidate, loginValidate, recipeValidate, recipeIdValidate } = require('./middlewares/validateData');
const authMiddleware = require('./middlewares/authentication');

const app = express();

app.use(bodyParser.json());

app.post('/users', userValidate, userController.registerUser);
app.post('/login', loginValidate, userController.loginUser);

app.post('/recipes', authMiddleware, recipeValidate, recipesController.registerRecipes);
app.get('/recipes/:id', recipeIdValidate, recipesController.recipeById);
app.get('/recipes', recipesController.listRecipes);

app.put('/recipes/:id', authMiddleware, recipeIdValidate, recipeValidate, recipesController.updateRecipeById);
app.delete('/recipes/:id', authMiddleware, recipeIdValidate, recipesController.deleteRecipeById);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('App listening on port 3000!'));
