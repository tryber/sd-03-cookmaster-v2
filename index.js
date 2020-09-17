const validateJWT = require('./middlewares/validateJwt');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.get('/', (_request, response) => {
  response.send();
});

const multer = require('multer');
const usersControler = require('./controller/usersControler');
const recipesController = require('./controller/recipesController');

const uploadInstance = multer({dest: 'images'})

app.use(bodyParser.json());

app.post('/users', usersControler.insertUser);
app.post('/users/admin', validateJWT, usersControler.insertAdmin);
app.post('/login', usersControler.selectUser);
app.get('/recipes', recipesController.getAllRecipes);
app.get('/recipes/:id', recipesController.getById);
app.post('/recipes', validateJWT, recipesController.createRecipe);
app.delete('/recipes/:id', validateJWT, recipesController.deleteRecipe);
app.put('/recipes/:id', validateJWT, recipesController.updateRecipe);
// app.put('/recipes/:id/image', validateJWT, recipesController);

app.post('/recipes/:id/image', uploadInstance.single('image'), (req, res) =>
  res.send().status(200)
  );

  app.listen(3000, () => { console.log('Escutando na porta 3k'); });
