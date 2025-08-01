const express = require('express');
const router = express.Router();

const { 
    insertTestData,
    getAllUsers,
    getAllTasks
} = require('../controllers/testController');

router.get('/insert', insertTestData);
router.get('/allusers', getAllUsers);
router.get('/alltasks', getAllTasks);

module.exports = router;