'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Administrator',
        email: 'admin@mail.com',
        password: await bcrypt.hash('p@ssw0rD', 10),
      },
    ]);

    await queryInterface.bulkInsert('tiers', [
      {
        name: 'Bronze',
        min_points: 0,
        max_points: 100,
      },
      {
        name: 'Silver',
        min_points: 101,
        max_points: 200,
      },
      {
        name: 'Gold',
        min_points: 201,
        max_points: 300,
      },
    ]);

    await queryInterface.bulkInsert('members', [
      {
        email: 'membersatu@mail.com',
        name: 'Member Satu',
        join_date: new Date(),
        phone: '082277887788',
        points: 0,
        status: true,
        birthday: new Date(2000, 1, 19),
        address: 'Jl. Bintara no 2',
      },
      {
        email: 'memberdua@mail.com',
        name: 'Member Dua',
        join_date: new Date(),
        phone: '082277887799',
        points: 0,
        status: true,
        birthday: new Date(2000, 4, 29),
        address: 'Jl. Bintara no 3',
      },
      {
        email: 'membertiga@mail.com',
        name: 'Member Tiga',
        join_date: new Date(),
        phone: '082277888899',
        points: 0,
        status: true,
        birthday: new Date(2000, 5, 20),
        address: 'Jl. Bintara no 4',
      },
    ]);

    await queryInterface.bulkInsert('items', [
      {
        name: 'Buku',
        price: 10000,
      },
      {
        name: 'Pensil',
        price: 15000,
      },
      {
        name: 'Penggaris',
        price: 20000,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, { truncate: true });
    await queryInterface.bulkDelete('tiers', null, { truncate: true });
    await queryInterface.bulkDelete('members', null, { truncate: true });
    await queryInterface.bulkDelete('items', null, { truncate: true });
  },
};
