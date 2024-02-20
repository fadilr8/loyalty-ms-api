const express = require('express');
const router = express.Router();

const memberController = require('../controllers/memberController');

router.get('/', (req, res) => {
  memberController.index(req, res);
});

router.get('/:id', (req, res) => {
  memberController.show(req, res);
});

router.post('/', (req, res) => {
  memberController.create(req, res);
});

router.put('/:id', (req, res) => {
  memberController.update(req, res);
});

router.delete('/:id', (req, res) => {
  memberController.destroy(req, res);
});

module.exports = router;
