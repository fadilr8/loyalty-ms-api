'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activities', {
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
      activity: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      date: {
        allowNull: true,
        type: Sequelize.DATEONLY,
      },
      transaction_number: {
        allowNull: true,
        type: Sequelize.STRING,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('activities');
  },
};
