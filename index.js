const express = require('express');
const bodyParser = require('body-parser');
const routeUsers = require('./routes/routeUsers');
const routeLogin = require('./routes/routeLogin');
const routeRecipes = require('./routes/routeRecipes');

const app = express();
app.use(bodyParser.json());
app.use('/users', routeUsers);
app.use('/login', routeLogin);
app.use('/recipes', routeRecipes);

app.get('/', (request, response) => {
  response.send();
});

app.use((err, _req, res, _next) => {
  const { message, status } = err;
  if (status < 500) {
    return res.status(status).json({ message });
  }
  res.status(500).send('Something broke!');
});

app.listen(3000, () => console.log('running'));
