'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usuarios_livros', [
      { id: 1, id_usuarios: 1, id_livros: 1, status: 'I' },
      { id: 2, id_usuarios: 2, id_livros: 2, status: 'I' },
      { id: 3, id_usuarios: 3, id_livros: 3, status: 'D' }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios_livros', null, {});
  }
};
