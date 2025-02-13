const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo foi enviado.');
  }

  res.send({
    message: 'Arquivo enviado com sucesso!',
    fileUrl: `/uploads/${req.file.filename}`
  });
});

module.exports = router;
