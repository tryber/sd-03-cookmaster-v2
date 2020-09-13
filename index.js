require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { usersRoutes, loginRoutes, recipesRoutes } = require('./routers/index');
const { errorMiddleware } = require('./middlewares/index');

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/image')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/recipes', recipesRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
