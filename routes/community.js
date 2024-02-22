const express = require('express');
const router = express.Router();

const communityController = require('../controllers/CommunityController');

router.post('/referral', (req, res) => {
  communityController.addReferral(req, res);
});

router.post('/activity', (req, res) => {
  communityController.addActivity(req, res);
});

module.exports = router
