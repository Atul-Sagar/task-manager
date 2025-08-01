const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        // check is the user already exists

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' })
        }


        // Hash password

        const hashedPassword = await bcrypt.hash(password, 10);


        // create user

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (err) {
        res.status(500).json({
            message: 'Registration failed',
            error: err.message
        })
    }
};

module.exports = {
    registerUser
}