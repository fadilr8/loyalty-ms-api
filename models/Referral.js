const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Member = require('./Member');

const Referral = db.define(
  'Referral',
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
    referral_id: {
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
    transaction_number: {
      allowNull: true,
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    tableName: 'referrals',
  }
);

Member.hasOne(Referral, { foreignKey: 'member_id', as: 'referral_data' });
Referral.belongsTo(Member, { foreignKey: 'referral_id', as: 'referral' });

module.exports = Referral;
