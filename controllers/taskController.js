const Task = require('../models/taskModel');
const express = require('express');
const router = express.Router();


// const { protect } = require('../middleware/authMiddleware')

// creating a new task

/**
 * @swagger
 * /tasks/create:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Task created successfully
 */
exports.createTask = async (req, res) => {
    try{
        const { title, description } = req.body;

        const newTask = new Task({
            title,
            description,
            user: req.user._id,
        });

        const savedTask = await newTask.save();

        res.status(201).json(savedTask);
    }catch(error){
        res.status(500).json({ error: 'Failed to create task' })
    }
};  


exports.getTask = async (req, res) => {
    try{
        const tasks = await Task.find({user: req.user._id});
        res.status(200).json(tasks);
    }catch(error){
        res.status(500).json({ error: 'Failed to get tasks' })
    }
};


exports.updateTask = async (req, res) => {
    try{
        const task = await Task.findOne({_id: req.params.id, user: req.user._id});

        if(!task) return res.status(404).json({ error: 'Task not found' });

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;

        const updateTask = await task.save();

        res.json(updateTask);
    }catch(error){
        res.status(500).json({error: 'Failed to update task'})
    }
}


exports.deleteTask = async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        })

        if(!task) return res.status(404).json({error: 'Task not found'})

        res.json({ message: 'Task deleted' })
    }catch(error){
        res.status(500).json({error: 'Failed to delete task'})
    }
}