'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('livros', [
      { id: 1, titulo: 'Livro 1', id_autor: 1, id_editora: 1 },
      { id: 2, titulo: 'Livro 2', id_autor: 2, id_editora: 2 },
      { id: 3, titulo: 'Livro 3', id_autor: 3, id_editora: 3 }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('livros', null, {});
  }
};
