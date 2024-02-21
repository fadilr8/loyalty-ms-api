const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Item = db.define(
  'Item',
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
    price: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
    tableName: 'items',
  }
);

module.exports = Item;
