const dns = require('node:dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const express = require('express');
const { initDb } = require('./data/database');
const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');
const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');

const app = express();
app.set('trust proxy', 1);
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax'
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
    url: 'http://localhost:3000',
    description: 'Local development server'
  },
  {
    url: 'https://personal-library-api-n5yk.onrender.com',
    description: 'Production server'
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
app.use('/auth', authRoutes);
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