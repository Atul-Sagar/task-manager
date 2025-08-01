const express = require('express');
const router = express.Router();

const { 
    insertTestData,
    getAllUsers,
    getAllTasks
} = require('../controllers/testController');

const { protect } = require('../middleware/authMiddleware')


router.get('/insert', insertTestData);
router.get('/allusers', getAllUsers);
router.get('/alltasks', getAllTasks);


router.get('/dashboard', protect, (req, res) => {
    res.json({
        message: `Welcome to your dashboard, ${req.user.name}`,
        user: req.user
    });
});

module.exports = router;