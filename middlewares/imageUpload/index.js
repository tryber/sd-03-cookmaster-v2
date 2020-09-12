const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, callback) => {
    // concatenando id da receita com extensão original do arquivo recebido
    const { id } = req.params;
    const { originalname } = file;
    return callback(null, `${id}${path.extname(originalname)}`);
  },
});
const upload = multer({ storage });

module.exports = { upload: upload.single('image') };
