const Member = require('../models/Member');
const Referral = require('../models/Referral');

async function index(req, res) {
  const members = await Member.findAll();

  res.status(200).json({ status: true, data: members });
}

async function show(req, res) {
  const member = await Member.findByPk(req.params.id, {
    include: {
      model: Referral,
      as: 'referral_data',
      include: { model: Member, as: 'referral' },
    },
  });

  res.status(200).json({ status: true, data: member });
}

async function create(req, res) {
  let body = req.body;
  body.join_date = new Date();

  await Member.create(req.body);

  res.status(201).json({ status: true, message: 'Created successfully' });
}

async function update(req, res) {
  const member = await Member.findByPk(req.params.id);

  if (!member) {
    return res.status(404).json({ status: false, message: 'Not Found' });
  }

  await member.update(req.body);

  res.status(200).json({ status: true, message: 'Updated successfully' });
}

async function destroy(req, res) {
  const member = await Member.findByPk(req.params.id);

  if (!member) {
    return res.status(404).json({ status: false, message: 'Not Found' });
  }

  await member.destroy();

  res.status(200).json({ status: true, message: 'Deleted successfully' });
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
