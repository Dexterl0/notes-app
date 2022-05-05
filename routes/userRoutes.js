const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/loggedin', userController.loggedIn);

router.get('/get-tags/:userId', userController.getTags);

module.exports = router;