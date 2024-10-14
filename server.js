require('dotenv').config();
const express = require('express');
const twt = require('jsonwebtoken');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');

const server = express();

server.get('/', (req, res) => {
  res.send('Hellow I am Rishab kshetri!');
});

const blogRouter = require('./routes/blog');
const videoRouter = require('./routes/video');
const userProvider = require('./routes/users');

// Database connection
main().catch(err => console.log('Database connection error:', err));

async function main() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URL is not defined in the environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected');
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1);
  }
}


// Middleware setup 
server.use(express.json());
server.use(cors({
  origin: ['https://red-smoke-0afb13400.5.azurestaticapps.net','http://localhost:3000'],
  credentials: true
}));

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

server.use(morgan('combined'));

const publicDir = process.env.PUBLIC_DIR || path.join(__dirname, 'public');
server.use(express.static(publicDir));

// Route handling
server.use('/api/blogs', blogRouter.router);
server.use('/api/videos', videoRouter.router);
server.use('/api/users', userProvider.router);

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
