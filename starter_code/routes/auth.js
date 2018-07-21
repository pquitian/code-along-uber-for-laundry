const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/signup', authController.create);
router.post('/signup', authController.doCreate);

module.exports = router;
