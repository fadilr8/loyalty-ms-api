'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('point_history', {
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
      transaction_number: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      date: {
        allowNull: true,
        type: Sequelize.DATEONLY,
      },
      type: {
        allowNull: true,
        type: Sequelize.ENUM('earned', 'redeemed'),
      },
      points: {
        allowNull: true,
        type: Sequelize.INTEGER
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('point_history');
  },
};
