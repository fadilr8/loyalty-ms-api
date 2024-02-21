const express = require('express');
const router = express.Router();

const tierController = require('../controllers/tierController');

router.get('/', (req, res) => {
  tierController.index(req, res);
});

router.get('/:id', (req, res) => {
  tierController.show(req, res);
});

router.post('/', (req, res) => {
  tierController.create(req, res);
});

router.put('/:id', (req, res) => {
  tierController.update(req, res);
});

router.delete('/:id', (req, res) => {
  tierController.destroy(req, res);
});

module.exports = router;
