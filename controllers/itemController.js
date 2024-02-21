const Item = require('../models/Item');

async function index(req, res) {
  const items = await Item.findAll();

  res.status(200).json({ status: true, data: items });
}

async function show(req, res) {
  const item = await Item.findByPk(req.params.id);

  res.status(200).json({ status: true, data: item });
}

async function create(req, res) {
  let body = req.body;

  await Item.create(req.body);

  res.status(201).json({ status: true, message: 'Created successfully' });
}

async function update(req, res) {
  const item = await Item.findByPk(req.params.id);

  if (!item) {
    return res.status(404).json({ status: false, message: 'Not Found' });
  }

  await item.update(req.body);

  res.status(200).json({ status: true, message: 'Updated successfully' });
}

async function destroy(req, res) {
  const item = await Item.findByPk(req.params.id);

  if (!item) {
    return res.status(404).json({ status: false, message: 'Not Found' });
  }

  await item.destroy();

  res.status(200).json({ status: true, message: 'Deleted successfully' });
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
