const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Activity = db.define(
  'Activity',
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
    activity: {
      allowNull: true,
      type: Sequelize.STRING,
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
    tableName: 'activities',
  }
);

module.exports = Activity;
