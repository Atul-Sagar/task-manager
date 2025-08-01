const express = require('express');
const app = express();
const { swaggerSpec, swaggerUI } = require('./swagger')

// middleware
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))


// Routes
const testRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');


app.use('/', testRoutes);
app.use('/', authRoutes);
app.use('/', taskRoutes);

module.exports = app;