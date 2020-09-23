const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const loginRoute = require('./controllers/loginController');
const recipesRoute = require('./controllers/recipesController');
const usersRoute = require('./controllers/usersController');
const errorHandler = require('./middlewares/errorHandler');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login', loginRoute);
app.use('/recipes', recipesRoute);
app.use('/users', usersRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.use(errorHandler);

app.listen(3000, () => console.log('listening on port 3000!'));
