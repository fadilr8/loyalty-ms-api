const LoyaltyProgram = require('../models/LoyaltyProgram');
const LoyaltyBenefit = require('../models/LoyaltyBenefit');

const db = require('../config/database');
const Tier = require('../models/Tier');

async function index(req, res) {
  const programs = await LoyaltyProgram.findAll();

  res.status(200).json({ status: true, data: programs });
}

async function show(req, res) {
  const program = await LoyaltyProgram.findByPk(req.params.id);

  res.status(200).json({ status: true, data: program });
}

async function create(req, res) {
  let body = req.body;

  const programData = {
    name: body.name,
    from: new Date(body.from),
    to: new Date(body.to),
    min_transaction: body.transactional.min_transaction,
    min_purchase: body.transactional.min_purchase,
    first_purchase: body.transactional.first_purchase,
    get_member: body.community.get_member,
    activity: body.community.activity,
    birthday_bonus: body.community.birthday_bonus,
  };

  const benefits = {
    percentage: body.benefits.is_fixed ? undefined : body.benefits.amount,
    points: body.benefits.is_fixed ? body.benefits.amount : undefined,
  };

  const t = await db.transaction();

  try {
    const program = await LoyaltyProgram.create(programData, {
      transaction: t,
    });
    const benefit = await LoyaltyBenefit.create(benefits, { transaction: t });
    const tiers = await Tier.findAll({ where: { id: body.tiers } });

    await program.setLoyaltyBenefit(benefit, { transaction: t });
    await program.addTiers(tiers, { transaction: t });

    await t.commit();

    res.status(201).json({ status: true, message: 'Created successfully' });
  } catch (error) {
    console.error(error);
    await t.rollback();

    return res.status(400).json({ status: false, message: 'Creation failed' });
  }
}

async function update(req, res) {
  const program = await LoyaltyProgram.findByPk(req.params.id);

  if (!program) {
    return res.status(404).json({ status: false, message: 'Not Found' });
  }

  res.status(200).json({ status: true, message: 'Updated successfully' });
}

async function destroy(req, res) {
  const program = await LoyaltyProgram.findByPk(req.params.id);

  if (!program) {
    return res.status(404).json({ status: false, message: 'Not Found' });
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
