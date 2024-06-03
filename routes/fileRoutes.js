const express = require('express');
const fileController = require('../controllers/fileController');

const router = express.Router();

router.post('/upload', fileController.uploadFile);
router.get('/:fileId', fileController.getFile);
router.get('/', fileController.getAllFiles);

module.exports = router;
