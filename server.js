require('dotenv').config();
const express = require('express');
const twt = require('jsonwebtoken');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');

const server = express();
const blogRouter = require('./routes/blog');
const videoRouter = require('./routes/video');
const userProvider = require('./routes/users');

// Database connection
main().catch(err => console.log('Database connection error:', err));

async function main() {
  await mongoose.connect(`mongodb+srv://rishab:${process.env.DB_PASSWORD}@cluster0.loqz1.mongodb.net/creatorDB?retryWrites=true&w=majority&appName=Cluster0`);
  console.log('Database connected');
}

// server.get("/protected", authenticateToken, (req, res) => {
//   res.json({ message: "This is a protected route", user: req.user });
// });

// Middleware setup 
server.use(express.json());
// server.use(cors());
server.use(cors({
  origin: ['https://content-creator-s-web-git-main-risabkshetris-projects.vercel.app/', 'http://localhost:3000'],
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

// Use 'combined' format for morgan to avoid deprecation warning
server.use(morgan('combined'));

// Serve static files, with a fallback in case PUBLIC_DIR is not set
const publicDir = process.env.PUBLIC_DIR || path.join(__dirname, 'public');
server.use(express.static(publicDir));

// Route handling
server.use('/api/blogs', blogRouter.router);
server.use('/api/videos', videoRouter.router);
server.use('/api/users', userProvider.router);
// server.use('/', userProvider.router);

// Server setup - use the PORT from environment variables or fallback to 8081
const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
