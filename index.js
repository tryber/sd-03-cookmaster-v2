const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(bodyParser.json());



// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', controllers.userController.createUser);
app.post('/recipes', validateJWT, controllers.recipeController.createRecipe);
app.post('/login', controllers.userController.userLogin);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => { console.log(`Escutando na porta ${PORT}`); });
