'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('loyalty_tier', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      program_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'loyalty_programs',
          key: 'id',
        },
      },
      tier_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'tiers',
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('loyalty_tier');
  },
};
