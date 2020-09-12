const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, callback) => {
    // concatenando id da receita com extensão original do arquivo recebido
    const { id } = req.params;
    return callback(null, `${id}.jpeg`);
  },
});
const upload = multer({ storage });

module.exports = { upload: upload.single('image') };
