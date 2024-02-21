const express = require('express');
const router = express.Router();

const loyaltyController = require('../controllers/LoyaltyController');

const { validator } = require('../middleware/requestValidator');
const loyaltyProgramSchema = require('../requests/LoyaltyProgramRequest');

router.get('/', (req, res) => {
  loyaltyController.index(req, res);
});

router.post('/', validator(loyaltyProgramSchema), (req, res) => {
  loyaltyController.create(req, res);
});

module.exports = router;
