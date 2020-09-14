const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const userController = require('./controllers/userController');
const services = require('./services');
const model = require('./model/model');

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'images'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = [
  upload.single('image'),
  async (req, res) => {
    // const { body, file, headers } = req;
    const { id } = req.params;
    const token = req.headers.authorization;
    const segredo = 'cookmaster_v2';
    const decoded = jwt.verify(token, segredo);
    const userLoggedId = decoded.data[0];
    const userLoggedRole = decoded.data[2];
    const { file } = req;
    const image = `localhost:3000/images/${file.filename}`;
    // validações
    if (userController.validateId(id)) {
      return res.status(404).send({ message: 'recipe not found' });
    }
    const recipe = await services.recipeServices.getRecipe(id);
    if (!recipe) {
      return res.status(404).send({ message: 'recipe not found' });
    }
    const userIdRecipe = recipe.userId;

    // regras de negócio
    if (userLoggedRole === 'admin') {
      await model
        .updateRecipe(recipe['_id'], recipe.name, recipe.ingredients, recipe.preparation, image);
      return res.status(200).json({ ...recipe, image });
    }
    if (userLoggedId !== userIdRecipe) {
      return { message: 'Usuário não pode editar essa receita', status: 415 };
    }
    await model
      .updateRecipe(recipe['_id'], recipe.name, recipe.ingredients, recipe.preparation, image);
    return res.status(200).json({ ...recipe, image });
  },
];
