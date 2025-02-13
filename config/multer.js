const multer = require('multer');
const path = require('path');

// Definindo o armazenamento do arquivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Define o diretório onde o arquivo será salvo
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Define o nome do arquivo
  }
});

// Filtrando os tipos de arquivos aceitos
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/; // Tipos permitidos
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
  limits: { fileSize: 500000 }, // Limite de 500KB
  fileFilter: fileFilter
});

module.exports = upload;