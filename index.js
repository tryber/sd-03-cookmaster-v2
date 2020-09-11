const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const controllers = require('./controllers');

const app = express();

app.use(bodyParser.json());

app.use('/users', controllers.users);
app.use('/login', controllers.login);
app.use('/recipes', controllers.recipes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// middleware de erro
app.use((err, _req, res, _next) => (err.payload
  ? res.status(err.status).json(err.payload)
  : res.status(500).json({ message: 'Internal error' })));

const { PORT = 3000 } = process.env;
const { log } = console;

app.listen(PORT, () => log(`Listening at port nr. ${PORT}`));
