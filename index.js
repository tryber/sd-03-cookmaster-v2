const validateJWT = require('./middlewares/validateJwt');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.get('/', (_request, response) => {
  response.send();
});

const usersControler = require('./controller/usersControler');
const recipesController = require('./controller/recipesController');

app.use(bodyParser.json());

// app.use('/recipes', recipesRouter);
// app.use('/users', usersRouter);

app.get('/users/:id', usersControler.getById);

app.post('/users', usersControler.insertUser);
app.post('/login', usersControler.selectUser);
app.get('/recipes', recipesController.getAllRecipes);
app.get('/recipes/:id', recipesController.getById);
app.put('/recipes/:id', validateJWT, recipesController.updateRecipe);
app.post('/recipes', validateJWT, recipesController.createRecipe);

app.listen(3000, () => { console.log('Escutando na porta 3k'); });
