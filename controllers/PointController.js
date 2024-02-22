const Member = require('../models/Member');

const db = require('../config/database');
const PointHistory = require('../models/PointHistory');

async function redeemPoint(req, res) {
  const { member_id, amount } = req.body;

  const member = await Member.findByPk(member_id);
  const points = member.points;

  const t = await db.transaction();

  try {
    const enoughPoints = points >= amount;

    if (enoughPoints) {
      const newPoints = points - amount;
      await member.update({ points: newPoints }, { transaction: t });

      const newPointHistory = await PointHistory.create(
        {
          member_id,
          date: new Date(),
          type: 'redeemed',
          points: amount,
        },
        { transaction: t }
      );

      await member.update({ points: newPoints }, { transaction: t });

      await t.commit();

      res.status(200).json({ status: true, message: 'Redeem successful' });
    } else {
      await t.rollback();
      res.status(400).json({ status: false, message: 'Not enough points' });
    }
  } catch (error) {
    console.error(error);
    await t.rollback();

    res.status(500).json({ status: false, message: 'Redeem failed' });
  }
}

module.exports = { redeemPoint };
