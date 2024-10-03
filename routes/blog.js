const express = require('express');
const blogController = require('../controller/blog'); // Import the blog controller
const router = express.Router();

router
.post('/', blogController.createBlog)
.get('/', blogController.getAllBlogs)
.get('/:id', blogController.getBlog)
// .get('/content/:id', blogController.getBlogContent)
.put('/:id', blogController.replaceBlog)
.patch('/:id', blogController.updateBlog)
.delete('/:id', blogController.deleteBlog);

exports.router = router;
