const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const LoyaltyTier = db.define(
  'LoyaltyTier',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    program_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'loyalty_programs',
        key: 'id',
      },
    },
    tier_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'tiers',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    tableName: 'loyalty_tier',
  }
);

module.exports = LoyaltyTier;
