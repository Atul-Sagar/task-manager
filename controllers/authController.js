const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{

        // check if the user exits

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }

        // compare password
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }


        // create JWT token

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN || '1d'}
        );


        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    }catch(err){
        res.status(500).json({
            message: 'Login failed',
            error: err.message
        })
    }
};

module.exports = {
    registerUser,
    loginUser
}