const express = require('express');
const router = express.Router();

const referralController = require('../controllers/ReferralController');

router.post('/', (req, res) => {
  referralController.addReferral(req, res);
});

module.exports = router
