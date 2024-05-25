// routes/userRoutes.js
const express = require('express');

const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/createUser', UserController.createUser);
router.get('/getUsers', UserController.getUsers);
router.post('/login', UserController.login);
router.get('/getUserById/:id', UserController.getUserById);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;