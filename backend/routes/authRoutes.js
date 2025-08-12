const express = require('express');
const { login, createDefaultUser } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/create-default-user', createDefaultUser);

module.exports = router;