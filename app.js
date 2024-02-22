const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc')
const apiDocs = require('./config/api-docs/apiDocs');

const routes = require('./routes/index');
const { swaggerUI, specs } = require('./config/swagger');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(apiDocs)));
app.use('/api', routes);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
