const express = require('express');
const router = express.Router();

const pointController = require('../controllers/PointController');

router.post('/redeem', (req, res) => {
  pointController.redeemPoint(req, res);
});

module.exports = router;
