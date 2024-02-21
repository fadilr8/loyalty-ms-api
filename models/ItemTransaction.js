const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const ItemTransaction = db.define(
  'ItemTransaction',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    item_id: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'items',
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
    qty: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    subtotal: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
    tableName: 'item_transaction',
  }
);

module.exports = ItemTransaction;
