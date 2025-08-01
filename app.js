const express = require('express');
const app = express();

// middleware
app.use(express.json());

// Routes
const testRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoutes');


app.use('/', testRoutes);
app.use('/', authRoutes);

module.exports = app;