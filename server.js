const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')

// Loading environment variables
dotenv.config();

// Connect to MongoDB
connectDB();


const app = express();
const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('API is running')
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})