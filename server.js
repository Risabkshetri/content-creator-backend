require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const server = express();
const blogRouter = require('./routes/blog');
const videoRouter = require('./routes/video');
const userProvider = require('./routes/users');

// Logging the environment variables for debugging
console.log('DB Password:', process.env.DB_PASSWORD);
console.log('Mongo URL:', process.env.MONGO_URL);

// Database connection
main().catch(err => console.log('Database connection error:', err));

async function main() {
  await mongoose.connect(`mongodb+srv://rishab:${process.env.DB_PASSWORD}@cluster0.loqz1.mongodb.net/creatorDB?retryWrites=true&w=majority&appName=Cluster0`);
  console.log('Database connected');
}

// Middleware setup
server.use(cors());
server.use(express.json());

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
