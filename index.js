const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');
const validateJWT = require('./auth/validateJWT');
const uploadToDisk = require('./upload-to-disk');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', controllers.userController.createUser);
app.put('/recipes/:id/image', validateJWT, uploadToDisk);
app.get('/recipes/:id', controllers.recipeController.showRecipe);
app.put('/recipes/:id', validateJWT, controllers.recipeController.updateRecipe);
app.delete('/recipes/:id', validateJWT, controllers.recipeController.deleteRecipe);
app.post('/recipes', validateJWT, controllers.recipeController.createRecipe);
app.get('/recipes', controllers.recipeController.showAllRecipes);
app.post('/login', controllers.userController.userLogin);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => { console.log(`Escutando na porta ${PORT}`); });
