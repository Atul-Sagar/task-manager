const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API',
            version: '1.0.0',
            description: 'API documentation for Task Manager App',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                },
            },
        },
        security: [
            {
                bearerAuth: []
            },
        ],
    },
    apis: [
        './routes/authRoutes.js',
        './routes/taskRoutes.js',
        './routes/testRoutes.js'
    ]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = {
    swaggerUI,
    swaggerSpec
}