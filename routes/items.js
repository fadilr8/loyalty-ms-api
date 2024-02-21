const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

router.get('/', (req, res) => {
  itemController.index(req, res);
});

router.get('/:id', (req, res) => {
  itemController.show(req, res);
});

router.post('/', (req, res) => {
  itemController.create(req, res);
});

router.put('/:id', (req, res) => {
  itemController.update(req, res);
});

router.delete('/:id', (req, res) => {
  itemController.destroy(req, res);
});

module.exports = router;
