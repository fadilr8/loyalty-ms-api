'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('loyalty_programs', {
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
      from: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      to: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      min_transaction: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      min_purchase: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      first_purchase: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      get_member: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      activity: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      birthday_bonus: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('loyalty_programs');
  },
};
