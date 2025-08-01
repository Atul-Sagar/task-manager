const express = require('express');
const router = express.Router();

const { 
    insertTestData,
    getAllUsers,
    getAllTasks
} = require('../controllers/testController');

const { protect } = require('../middleware/authMiddleware')

/**
 * @swagger
 * /api/test/insert:
 *   get:
 *     summary: Insert test data into the database
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: Test data inserted successfully
 *       500:
 *         description: Server error
 */
router.get('/insert', insertTestData);

/**
 * @swagger
 * /api/test/allusers:
 *   get:
 *     summary: Get all users in the system
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   _id:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/allusers', getAllUsers);

/**
 * @swagger
 * /api/test/alltasks:
 *   get:
 *     summary: Get all tasks in the system
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: List of all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Server error
 */
router.get('/alltasks', getAllTasks);

/**
 * @swagger
 * /api/test/dashboard:
 *   get:
 *     summary: Get user dashboard
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Not authorized
 */
router.get('/dashboard', protect, (req, res) => {
    res.json({
        message: `Welcome to your dashboard, ${req.user.name}`,
        user: req.user
    });
});

module.exports = router;