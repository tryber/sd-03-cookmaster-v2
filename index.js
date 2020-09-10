require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { usersRoutes } = require('./controllers/routers/usersRoutes')
const { errorMiddleware } = require('./middlewares/index');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersRoutes);

app.use((err, _req, res, _next) => errorMiddleware(err, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
