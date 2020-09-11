const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');
const services = require('./services');
const auth = require('./services/auth');

const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
    response.send();
});

app.post('/users', controllers.userController.addUser);
app.post('/login', controllers.userController.loginUser);

app.get('/recipes', services.auth(false), controllers.recipeController.listRecipes);
app.post('/recipes', services.auth(), controllers.recipeController.addRecipe);

app.get('/recipes/:id', services.auth(false), controllers.recipeController.listById);
app.put('/recipes/:id', services.auth(), controllers.recipeController.update);
app.delete('/recipes/:id', services.auth(), controllers.recipeController.removeRecipe);

app.listen(3000, () => console.log('Listening on 3000'));
