const swaggerUI = require('swagger-ui-express');
const swagger = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Loyalty Management System API',
      version: '3.0.0',
      description: 'API for Loyalty Management System',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
        description: 'Local server for development purpose',
      },
    ],
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
};

const specs = swagger(options);

module.exports = {
  swaggerUI,
  specs,
};
