// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/users');

router
.post('/register', userController.register)
.post('/login', userController.login)
.get('/users', userController.getAllUsers)
.get('/users/:id', userController.getUser)
exports.router = router;