const dns = require('node:dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const express = require('express');
const { initDb } = require('./data/database');
const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal Library API',
      version: '1.0.0',
      description: 'API for managing books and authors in a personal library.'
    },
    servers: [
      {
        url: `process.env.personal-library-api-n5yk.onrender.com` || `http://localhost:${process.env.PORT || 3000}`
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Personal Library API is running');
});

app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Server could not start:', error);
    process.exit(1);
  });