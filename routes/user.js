const express = require('express');

const userController = require('../controllers/user');
const { validateUser } = require('../middlewares/validate');
const { authenticated } =require('../middlewares/auth');

const router = express.Router();

router.get('/login', validateUser('login'), userController.login);
router.get('/updateUser', authenticated, validateUser('updateUser'), userController.updateUser);

module.exports = router