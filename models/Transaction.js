const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Transaction = db.define(
  'Transaction',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    member_id: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'members',
        key: 'id',
      },
    },
    date: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
    total: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
    tableName: 'transactions',
  }
);

module.exports = Transaction;
