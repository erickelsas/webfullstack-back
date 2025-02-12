const express = require('express');
const router = express.Router();
const installController = require('../controllers/installController');

router.post('/install', installController.install);

module.exports = router;
