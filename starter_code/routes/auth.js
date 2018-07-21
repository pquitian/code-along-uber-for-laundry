const express = require('express');
const router = express.Router();
const authController = require('../blabla')

router.get('/signup', authController.doCreate);

