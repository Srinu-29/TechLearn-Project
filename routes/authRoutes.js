const router = require('express').Router();
const authController = require('../controllers/authController');

//Auth Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
module.exports = router;