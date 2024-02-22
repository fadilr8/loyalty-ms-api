const Referral = require('../models/Referral');
const Member = require('../models/Member');
const Activity = require('../models/Activity');
const LoyaltyProgram = require('../models/LoyaltyProgram');
const PointHistory = require('../models/PointHistory');

const db = require('../config/database');

const { formatDate } = require('../utils/utils');
const LoyaltyBenefit = require('../models/LoyaltyBenefit');

async function addReferral(req, res) {
  const { member_id, referral_id } = req.body;

  if (member_id === referral_id) {
    return res.status(400).json({
      status: false,
      message: 'Wrong input',
    });
  }

  const referrals = await Referral.findAll({ where: { member_id } });

  if (referrals.length > 0) {
    return res.status(400).json({
      status: false,
      message: 'Already added referral',
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

    const program = await LoyaltyProgram.findOne({
      where: { get_member: true },
      include: {
        model: LoyaltyBenefit,
        as: 'benefit',
      },
    });

    const pointHistoryData = {
      member_id: referral_id,
      transaction_number: transactionNum,
      date: new Date(),
      type: 'earned',
      points: program.benefit.points,
    };

    await PointHistory.create(pointHistoryData, { transaction: t });

    const addedPoint = referral.points + program.benefit.points;
    await referral.update({ points: addedPoint }, { transaction: t });

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

async function addActivity(req, res) {
  const { member_id, activity } = req.body;

  const member = await Member.findByPk(member_id);

  if (!member) {
    return res.status(404).json({
      status: false,
      message: 'Member not found',
    });
  }

  const t = await db.transaction();

  try {
    const act = await Activity.create(
      { member_id, activity },
      { transaction: t }
    );

    const num = act.id.toString().padStart(6, 0);
    const transactionNum = 'TRACT-' + num + '-' + formatDate(new Date());

    const updateData = { date: new Date(), transaction_number: transactionNum };
    await act.update(updateData, { transaction: t });

    const program = await LoyaltyProgram.findOne({
      where: { activity },
      include: {
        model: LoyaltyBenefit,
        as: 'benefit',
      },
    });

    if (!program) {
      return res
        .status(404)
        .json({ status: false, message: 'Activity Not Found' });
    }

    const isBirthday = birthdayCheck(member);
    let birthdayBonus = 0;

    if (isBirthday) {
      const birthdayProgram = await LoyaltyProgram.findOne({
        where: { birthday_bonus: true },
        include: {
          model: LoyaltyBenefit,
          as: 'benefit',
        },
      });

      birthdayBonus = birthdayProgram.benefit.points;
    }

    const pointHistoryData = {
      member_id,
      transaction_number: transactionNum,
      date: new Date(),
      type: 'earned',
      points: program.benefit.points + birthdayBonus,
    };

    await PointHistory.create(pointHistoryData, { transaction: t });

    let addedPoint = member.points + program.benefit.points + birthdayBonus;
    await member.update({ points: addedPoint }, { transaction: t });

    await t.commit();

    res.status(201).json({
      status: true,
      message: 'Added Activity successfully',
    });
  } catch (error) {
    console.error(error);
    await t.rollback();

    res.status(500).json({ status: false, message: 'Add failed' });
  }
}

const birthdayCheck = (member) => {
  //check whether today is member's birthday
  const today = new Date();
  const birthday = new Date(member.birthday);
  const isToday = today.getDate() === birthday.getDate();
  const isBirthday = today.getMonth() === birthday.getMonth();

  return isToday && isBirthday;
};

module.exports = {
  addReferral,
  addActivity,
};
