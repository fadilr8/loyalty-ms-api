const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Tier = db.define(
  'Tier',
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
    min_points: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    max_points: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
    tableName: 'tiers',
  }
);

module.exports = Tier;
