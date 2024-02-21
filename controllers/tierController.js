const Tier = require('../models/Tier');

async function index(req, res) {
  const tiers = await Tier.findAll();

  res.status(200).json({ status: true, data: tiers });
}

async function show(req, res) {
  const tier = await Tier.findByPk(req.params.id);

  res.status(200).json({ status: true, data: tier });
}

async function create(req, res) {
  let body = req.body;

  await Tier.create(body);

  res.status(201).json({ status: true, message: 'Created successfully' });
}

async function update(req, res) {
  const tier = await Tier.findByPk(req.params.id);

  if (!tier) {
    return res.status(404).json({ status: false, message: 'Not Found' });
  }

  await tier.update(req.body);

  res.status(200).json({ status: true, message: 'Updated successfully' });
}

async function destroy(req, res) {
  const tier = await Tier.findByPk(req.params.id);

  if (!tier) {
    return res.status(404).json({ status: false, message: 'Not Found' });
  }

  await tier.destroy();

  res.status(200).json({ status: true, message: 'Deleted successfully' });
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
