const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Item = require('./Item');

const Transaction = db.define(
  'Transaction',
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
    date: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
    total: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
    tableName: 'transactions',
  }
);

Transaction.belongsToMany(Item, {
  through: 'transaction_items',
  foreignKey: 'transaction_id',
});

Item.belongsToMany(Transaction, {
  through: 'transaction_items',
  foreignKey: 'item_id',
});


module.exports = Transaction;
