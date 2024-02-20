const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Member = db.define(
  'Members',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    join_date: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    phone: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    points: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    status: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    birthday: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    address: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    tableName: 'members',
  }
);

module.exports = Member;
