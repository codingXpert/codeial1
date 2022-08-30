const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
  
router.get('/:id', profileController.profile);

router.post('/update', profileController.updateProfile);

router.get('/update/back-profile/', profileController.updateCoverPic);

module.exports = router;