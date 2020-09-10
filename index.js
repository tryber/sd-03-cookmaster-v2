require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const { usersRouter, login, recipesRouter } = require('./controllers');
const Boom = require('boom');

const app = express();
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', login);
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);

app.use((err, _req, res, _next) => {
  if (Boom.isBoom(err)) {
    const { statusCode, payload: { message } } = err.output;
    return res.status(statusCode).json({ message });
  }
  console.error(err.message, err.stack);
  return res.status(500).json({ message: 'Internal Error' });
})

const { PORT = 3000 } = process.env;

app.listen(PORT, () => { console.log(`Ouvindo na porta ${3000}`)});
