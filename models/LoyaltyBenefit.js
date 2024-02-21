const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const LoyaltyBenefit = db.define(
  'LoyaltyBenefit',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    program_id: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'loyalty_programs',
        key: 'id',
      },
    },
    percentage: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    points: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
    tableName: 'loyalty_benefits',
  }
);

module.exports = LoyaltyBenefit;
