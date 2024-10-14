'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('livros', [
      {
        titulo: 'Livro 1',
        autor: 'Autor 1',
        id_usuario: 1,
      },
      {
        titulo: 'Livro 2',
        autor: 'Autor 2',
        id_usuario: 2,
      },
      {
        titulo: 'Livro 3',
        autor: 'Autor 3',
        id_usuario: 3,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('livros', null, {});
  },
};
