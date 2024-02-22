const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/TransactionController');

router.post('/', (req, res) => {
  transactionController.addTransaction(req, res);
});

module.exports = router;
