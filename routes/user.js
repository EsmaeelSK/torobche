const express = require('express');

const userController = require('../controllers/user');
const { validateUser } = require('../middlewares/validate');
const { authenticated } =require('../middlewares/auth');

const router = express.Router();

router.post('/signup', validateUser('signup'), userController.signup);
router.get('/login', validateUser('login'), userController.login);
router.get('/forgotPassword', validateUser('forgotPassword'), userController.forgotPassword);
router.get('/auth/:kind/:token', validateUser('resetPassword'), userController.auth);
router.get('/resetPassword', validateUser('resetPassword'), userController.resetPassword);
router.get('/updateUser', authenticated, validateUser('updateUser'), userController.updateUser);


module.exports = router