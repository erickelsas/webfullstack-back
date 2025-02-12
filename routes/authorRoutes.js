const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.post('/', authorController.createAuthor);

router.get('/search', authorController.getAuthorsByName);

router.get('/', authorController.getAllAuthors);

module.exports = router;
