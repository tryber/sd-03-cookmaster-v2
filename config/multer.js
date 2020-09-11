const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images');
  },
  filename(req, file, cb) {
    const { id } = req.params;
    cb(null, id);
  },
});

module.exports = storage;
