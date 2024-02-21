'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('loyalty_benefits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      program_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'loyalty_programs',
          key: 'id',
        },
      },
      percentage: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      points: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('loyalty_benefits');
  },
};
