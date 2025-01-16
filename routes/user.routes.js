const express = require('express');
const { getCurrentUser } = require('../controller/user.controller');

const router = express.Router();

router.get('/current-user', getCurrentUser);

module.exports = router;
