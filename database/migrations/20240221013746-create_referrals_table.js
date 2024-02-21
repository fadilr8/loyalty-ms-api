'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('referrals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      member_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'members',
          key: 'id',
        },
      },
      referral_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'members',
          key: 'id',
        },
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      transaction_number: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('referrals');
  },
};
