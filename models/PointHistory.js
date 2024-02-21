const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const PointHistory = db.define(
  'PointHistory',
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
    transaction_id: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'transactions',
        key: 'id',
      },
    },
    date: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
    type: {
      allowNull: true,
      type: Sequelize.ENUM('earned', 'redeemed'),
    },
    point: {
      allowNull: true,
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false,
    tableName: 'point_history',
  }
);

module.exports = PointHistory;
