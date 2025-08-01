const express = require('express');
const router = express.Router();

const { insertTestData } = require('../controllers/testController');

router.get('/insert', insertTestData);

module.exports = router;