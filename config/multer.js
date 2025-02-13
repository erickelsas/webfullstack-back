const multer = require('multer');
const path = require('path');

// Definindo o armazenamento do arquivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error('Tipo de arquivo não permitido'), false);
  }
};

// Configurações do multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 500000 },
  fileFilter: fileFilter
});

module.exports = upload;