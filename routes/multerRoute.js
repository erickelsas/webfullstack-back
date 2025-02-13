const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

// Middleware para tratamento de erros do multer
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).send(`Erro no upload: ${err.message}`);
  }
  if (err) {
    return res.status(500).send(`Erro desconhecido: ${err.message}`);
  }
  next();
};

router.post('/upload', upload.single('file'), multerErrorHandler, (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo foi enviado.');
  }

  res.send({
    message: 'Arquivo enviado com sucesso!',
    fileUrl: `/uploads/${req.file.filename}`
  });
});

module.exports = router;