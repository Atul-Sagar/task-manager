const express = require('express');
const app = express();

// middleware
app.use(express.json());

// Routes
const testRoutes = require('./routes/testRoutes');
app.use('/', testRoutes);

module.exports = app;