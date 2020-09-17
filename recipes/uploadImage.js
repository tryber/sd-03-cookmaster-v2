const multer = require('multer');
const path = require('path');
const Model = require('./recipeModel');

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: (req, file, cb) => {
    cb(null, `${req.params.id}.jpeg`);
  },

});

const upload = multer({ storage }).single('image');

const update = async (req, res, next) => {
  console.log('req.image', req.image);
  const { id } = req.params;
  const image = { image: `localhost:3000/images/${id}.jpeg` };
  const insertImage = await Model.updateImage(image, id);
  if (!insertImage) return next('not_found');
  const updated = await Model.findById(id);
  console.log('updated:', updated);
  return res.status(200).json(updated);
};
module.exports = { upload, update };
