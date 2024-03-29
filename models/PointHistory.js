const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');
const Member = require('./Member');

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
    transaction_number: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    date: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
    type: {
      allowNull: true,
      type: Sequelize.ENUM('earned', 'redeemed'),
    },
    points: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
    tableName: 'point_history',
  }
);

Member.hasMany(PointHistory, { foreignKey:'member_id', as: 'point_history' });

module.exports = PointHistory;
