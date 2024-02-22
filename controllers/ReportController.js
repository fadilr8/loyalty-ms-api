const { fn, col, Op } = require('sequelize');
const ExcelJS = require('exceljs');
const fs = require('fs');

const Member = require('../models/Member');
const PointHistory = require('../models/PointHistory');

async function getPointHistory(req, res) {
  const data = await getPointHistoryFunc(req);

  res.status(200).json({ status: true, data });
}

async function exportExcel(req, res) {
  const data = await getPointHistoryFunc(req);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Members');

  // Add headers
  worksheet.addRow([
    'ID',
    'Name',
    'Email',
    'Remaining Points',
    'Earned Points',
  ]);

  // Add data
  data.forEach((member) => {
    worksheet.addRow([
      member.id,
      member.name,
      member.email,
      member.remaining_points,
      member.earned_points,
    ]);

    // Add point history as separate rows
    member.point_history.forEach((history) => {
      worksheet.addRow([
        '',
        '',
        '',
        '',
        '',
        history.id,
        history.transaction_number,
        history.date,
        history.type,
        history.points,
      ]);
    });

    // Add an empty row between members
    worksheet.addRow([]);
  });

  // Save the workbook to a file
  const fileName = './downloads/members.xlsx';
  await workbook.xlsx.writeFile(fileName);

  // Download the file
  fs.readFile(fileName, (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    console.log('File successfully read');

    // Set headers for the download
    const headers = {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=members.xlsx',
    };

    // Send the file as a response
    res.set(headers).send(data);
  });
}

const getPointHistoryFunc = async (req) => {
  const { id, type } = req.params;
  const { from, to, operator, value, search } = req.query;

  let startDate, endDate;

  if (from && to) {
    startDate = new Date(from);
    endDate = new Date(to);
  }

  let operatorSym;
  if (operator && value) {
    switch (operator) {
      case '>':
        operatorSym = Op.gt;
        break;
      case '>=':
        operatorSym = Op.gte;
        break;
      case '<':
        operatorSym = Op.lt;
        break;
      case '<=':
        operatorSym = Op.lte;
        break;
      default:
        operatorSym = Op.eq;
        break;
    }
  }

  const member = await Member.findAll({
    where: { ...(search && { name: { [Op.like]: `%${search}%` } }) },
    include: {
      model: PointHistory,
      as: 'point_history',
      where: {
        type,
        ...(from && to && { date: { [Op.between]: [startDate, endDate] } }),
        ...(operator && value && { points: { [operatorSym]: value } }),
      },
    },
    group: ['Member.id', 'point_history.id'],
  });

  const data = member.map((member) => {
    const totalPoints = member.point_history.reduce((acc, curr) => {
      return acc + curr.points;
    }, 0);

    const keyName = type === 'earned' ? 'earned_points' : 'redeemed_points';

    return {
      id: member.id,
      name: member.name,
      email: member.email,
      remaining_points: member.points,
      [keyName]: totalPoints,
      point_history: member.point_history,
    };
  });

  return data;
};

module.exports = { getPointHistory, exportExcel };
