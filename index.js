const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const authMiddleware = require('./middlewares/authMiddleware');
const recipeController = require('./controllers/recipeController');

const app = express();

app.use(bodyParser.json());

app.post('/users', userController.addUser);
app.post('/login', userController.userLogin);

app.post('/recipes', authMiddleware, recipeController.addRecipe);
app.get('/recipes', recipeController.getRecipes);
app.get('/recipes/:id', recipeController.getRecipeById);
app.delete('/recipes/:id', authMiddleware, recipeController.deleteRecipe);
app.put('/recipes/:id', authMiddleware, recipeController.editRecipe);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000!');
});
