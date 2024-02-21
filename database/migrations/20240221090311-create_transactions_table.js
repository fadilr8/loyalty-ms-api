'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  },
};
