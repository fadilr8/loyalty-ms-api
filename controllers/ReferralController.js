const Referral = require('../models/Referral');
const Member = require('../models/Member');

const db = require('../config/database');

const { formatDate } = require('../utils/utils');

async function addReferral(req, res) {
  const { member_id, referral_id } = req.body;

  if (member_id === referral_id) {
    return res.status(400).json({
      status: false,
      message: 'Wrong input',
    });
  }

  const member = await Member.findByPk(member_id);
  const referral = await Member.findByPk(referral_id);

  if (!member || !referral) {
    return res.status(404).json({
      status: false,
      message: 'Member not found',
    });
  }

  const t = await db.transaction();

  try {
    const reff = await Referral.create(
      { member_id, referral_id },
      { transaction: t }
    );

    const num = reff.id.toString().padStart(6, 0);
    const transactionNum = 'TRMGM-' + num + '-' + formatDate(new Date());

    const updateData = { date: new Date(), transaction_number: transactionNum };
    await reff.update(updateData, { transaction: t });

    await t.commit();

    res.status(201).json({
      status: true,
      message: 'Added Referral successfully',
    });
  } catch (error) {
    await t.rollback();
    console.error(error);
    return res.status(500).json({ status: false, message: 'Add failed' });
  }
}

module.exports = {
  addReferral,
};
