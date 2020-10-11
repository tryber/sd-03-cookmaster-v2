const validateJWT = require('./middlewares/validateJwt');
const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/uploads'));

const usersControler = require('./controller/usersControler');
const recipesController = require('./controller/recipesController');

// Ajusta o caminho de destino e o nome que o arquivo será salvo
const storage = multer.diskStorage({
  destination: 'images/',
  filename: (req, _file, callback) => { callback(null, req.params.id + '.jpeg') }
})

const uploadInstance = multer({ storage });

app.post('/users', usersControler.insertUser);
app.post('/users/admin', validateJWT, usersControler.insertAdmin);
app.post('/login', usersControler.selectUser);
app.get('/recipes', recipesController.getAllRecipes);
app.get('/recipes/:id', recipesController.getById);
app.post('/recipes', validateJWT, recipesController.createRecipe);
app.delete('/recipes/:id', validateJWT, recipesController.deleteRecipe);
app.put('/recipes/:id', validateJWT, recipesController.updateRecipe);
app.put(
  '/recipes/:id/image',
  validateJWT,
  uploadInstance.single('image'),
  recipesController.addImageToRecipe
  );

app.post('/recipes/:id/image', uploadInstance.single('image'), (req, res) =>
  res.send(req.file).status(200),
);

app.listen(3000, () => { console.log('Escutando na porta 3k'); });
