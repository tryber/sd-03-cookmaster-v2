const express = require('express');
const path = require('path');
const multer = require('multer');

const index = require('../controllers');
const middlewares = require('../middlewares/index');

const router = express.Router();
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: (req, _file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });
router.post('/', middlewares.auth, index.recipesController.setNewRecipe);
router.get('/', index.recipesController.findAllRecipes);
router.get('/:id', index.recipesController.findRecipesById);
router.put('/:id', middlewares.auth, index.recipesController.editRecipe);
router.delete('/:id', middlewares.auth, index.recipesController.deleteRecipe);
router.post('/:id/image', middlewares.auth, upload.single('image'), index.recipesController.addImage);

module.exports = router;
