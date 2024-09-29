'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('editora', [
      { id: 1, nome: 'Editora 1' },
      { id: 2, nome: 'Editora 2' },
      { id: 3, nome: 'Editora 3' }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('editora', null, {});
  }
};