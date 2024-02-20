const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define(
  'User',
  {
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    tableName: 'users',
  }
);

module.exports = User;
