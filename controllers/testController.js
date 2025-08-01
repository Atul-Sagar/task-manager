const User = require('../models/User');
const Task = require('../models/Task');

const insertTestData = async (req, res) => {
    try{
        await User.deleteMany();
        await Task.deleteMany();

        const user = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        });

        const tasks = await Task.insertMany([
            {
                title: 'Complete Node.js setup',
                description: 'Initialize project structure and DB',
                status: 'in progress',
                dueDate: new Date(),
                priority: 'high',
                user: user._id
            },
            {
                title: 'Design Auth System',
                description: 'Setup login and register routes',
                status: 'pending',
                dueDate: new Date(),
                priority: 'medium',
                user: user._id
            },

        ])

        res.status(200).json({
            message: 'Inserted test data successfully',
            user,
            tasks,
        })
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Failed to insert test data'});
    }
};

const getAllUsers = async (req, res) => {
    try{
        const users = await User.find().select('-__v');
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({ message: 'Failed to fetch users' })
    }
};


const getAllTasks = async (req, res) => {
    try{
        const tasks = await Task.find().populate('user', 'name email').select('-__V');
        res.status(200).json(tasks);
    }catch(error){
        res.status(500).json({message: 'Failed to fetch tasks'})
    }
};

module.exports = { 
    insertTestData,
    getAllUsers,
    getAllTasks,
};
