// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/users');

router
.post("/register", userController.register)
.post("/login", userController.login)
.post("/refresh-token", userController.refreshToken)
.post("/logout", userController.logout);
exports.router = router;