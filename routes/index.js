const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');


router.get('/', homeController.home);

router.use('/user', require('./user'));

router.use('/profile', require('./profile'));



module.exports = router;