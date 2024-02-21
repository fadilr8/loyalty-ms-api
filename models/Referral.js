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
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'members',
        key: 'id',
      },
    },
    referral_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'members',
        key: 'id',
      },
    },
    date: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    transaction_number: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    tableName: 'referrals',
  }
);

Referral.belongsTo(Member, {foreignKey: 'member_id', targetKey: 'id', as:'member'})
Member.hasMany(Referral, {foreignKey: 'referral_id', sourceKey: 'id', as: 'referrals'})

module.exports = Referral;
