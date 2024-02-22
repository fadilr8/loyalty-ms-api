const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Item = require('./Item');
const Member = require('./Member');

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
    transaction_number: {
      allowNull: true,
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    tableName: 'transactions',
  }
);

Transaction.belongsTo(Member, { foreignKey:'member_id', as:'member' });

Transaction.belongsToMany(Item, {
  through: 'item_transaction',
  foreignKey: 'transaction_id',
});

Item.belongsToMany(Transaction, {
  through: 'item_transaction',
  foreignKey: 'item_id',
});


module.exports = Transaction;
