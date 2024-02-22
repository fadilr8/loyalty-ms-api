const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const LoyaltyBenefit = require('./LoyaltyBenefit');
const Tier = require('./Tier');

const LoyaltyProgram = db.define(
  'LoyaltyProgram',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    from: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    to: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    min_transaction: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    min_purchase: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    first_purchase: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
    },
    get_member: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
    },
    activity: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    birthday_bonus: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: false,
    tableName: 'loyalty_programs',
  }
);

LoyaltyProgram.hasOne(LoyaltyBenefit, {
  foreignKey: 'program_id',
  as: 'benefit',
});
LoyaltyBenefit.belongsTo(LoyaltyProgram, { foreignKey: 'program_id' });

LoyaltyProgram.belongsToMany(Tier, {
  through: 'loyalty_tier',
  foreignKey: 'program_id',
  as: 'tiers',
});
Tier.belongsToMany(LoyaltyProgram, {
  through: 'loyalty_tier',
  foreignKey: 'tier_id',
  as: 'programs',
});

module.exports = LoyaltyProgram;
