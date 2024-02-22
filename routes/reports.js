const express = require('express');
const router = express.Router();

const reportController = require('../controllers/ReportController');

router.get('/:id/:type', (req, res) => {
  reportController.getPointHistory(req, res);
});

router.get('/export-excel/:id/:type', (req, res) => {
  reportController.exportExcel(req, res);
})

module.exports = router;
