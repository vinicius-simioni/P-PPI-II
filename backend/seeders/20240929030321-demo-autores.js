'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('autores', [
      { id: 1, nome: 'Autor 1' },
      { id: 2, nome: 'Autor 2' },
      { id: 3, nome: 'Autor 3' }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('autores', null, {});
  }
};
