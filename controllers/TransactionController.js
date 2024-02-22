const Item = require('../models/Item');
const Transaction = require('../models/Transaction');
const ItemTransaction = require('../models/ItemTransaction');

const db = require('../config/database');
const { formatDate } = require('../utils/utils');
const { startOfDay, endOfDay } = require('date-fns');
const LoyaltyProgram = require('../models/LoyaltyProgram');
const { Op } = require('sequelize');
const LoyaltyBenefit = require('../models/LoyaltyBenefit');
const PointHistory = require('../models/PointHistory');
const Member = require('../models/Member');

async function addTransaction(req, res) {
  const { member_id, items } = req.body;

  const member = await Member.findByPk(member_id);

  if (!member) {
    return res.status(404).json({
      status: false,
      message: 'Member not found',
    });
  }

  const t = await db.transaction();

  try {
    const itemIds = items.map((item) => item.item_id);
    const fetchedItems = await Item.findAll({ where: { id: itemIds } });

    const fetchedItemData = fetchedItems.map((item, index) => {
      const qty = items[index].qty;
      const subtotal = item.price * qty;
      return {
        ...item.toJSON(),
        qty,
        subtotal,
      };
    });

    const total = fetchedItemData.reduce((acc, curr) => acc + curr.subtotal, 0);
    const totalQty = fetchedItemData.reduce((acc, curr) => acc + curr.qty, 0);

    const transactionData = { member_id, date: new Date(), total };
    const transaction = await Transaction.create(transactionData, {
      transaction: t,
    });

    const num = transaction.id.toString().padStart(6, 0);
    const transactionNum = 'TRINV-' + num + '-' + formatDate(new Date());

    await transaction.update(
      { transaction_number: transactionNum },
      { transaction: t }
    );

    const checked = await checkTransaction(member_id, total, totalQty);

    let benefitPoints = 0;

    if (checked) {
      if (checked.percentage) {
        benefitPoints = total * (checked.percentage / 100);
      } else if (checked.points) {
        benefitPoints = checked.points;
      }

      const pointHistoryData = {
        member_id,
        transaction_number: transactionNum,
        date: new Date(),
        type: 'earned',
        points: benefitPoints,
      };

      await PointHistory.create(pointHistoryData, { transaction: t });

      let addedPoint = member.points + benefitPoints;
      await member.update({ points: addedPoint }, { transaction: t });
    }

    for (const { id, qty, subtotal } of fetchedItemData) {
      await ItemTransaction.create(
        { item_id: id, transaction_id: transaction.id, qty, subtotal },
        { transaction: t }
      );
    }

    await t.commit();

    res.status(200).json({ status: true, message: 'Transaction successfull' });
  } catch (error) {
    console.error(error);
    await t.rollback();

    res.status(500).json({ status: false, message: 'Add failed' });
  }
}

const checkTransaction = async (member_id, total, totalQty) => {
  const transactions = await Transaction.findAll({ where: { member_id } });
  const firstPurchase = transactions.length === 0;

  const today = new Date();
  const startDate = startOfDay(today);
  const endDate = endOfDay(today);

  const programCheckData = await LoyaltyProgram.findAll({
    where: {
      get_member: null,
      activity: null,
      birthday_bonus: null,
      from: { [Op.lte]: endDate },
      to: { [Op.gte]: startDate },
    },
  });

  let programId;

  if (programCheckData.length > 0) {
    const resultItem = programCheckData.find((program) => {
      const isFirstPurchase = program.first_purchase === firstPurchase;
      const isMinAmount =
        program.min_transaction <= total && program.min_transaction !== null;
      const isMinQty =
        program.min_purchase <= totalQty && program.min_purchase !== null;

      return (
        !!program.first_purchase === isFirstPurchase &&
        !!program.min_transaction === isMinAmount &&
        !!program.min_purchase === isMinQty
      );
    });

    programId = resultItem.id;
  }

  if (programId) {
    const selectedProgram = await LoyaltyProgram.findOne({
      where: { id: programId },
      include: {
        model: LoyaltyBenefit,
        as: 'benefit',
      },
    });

    return selectedProgram.benefit;
  }

  return null;
};

module.exports = { addTransaction };
