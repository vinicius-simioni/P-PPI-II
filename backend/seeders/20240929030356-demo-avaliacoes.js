'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('avaliacoes', [
      { id: 1, id_usuarios: 1, pontualidade: 5, conservacao_livro: 4, livro_disponivel: 1 },
      { id: 2, id_usuarios: 2, pontualidade: 4, conservacao_livro: 5, livro_disponivel: 1 },
      { id: 3, id_usuarios: 3, pontualidade: 3, conservacao_livro: 2, livro_disponivel: 0 }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('avaliacoes', null, {});
  }
};
