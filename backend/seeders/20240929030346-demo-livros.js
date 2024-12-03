'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('livros', [
      {
        titulo: 'A',
        autor: 'A',
        id_usuario: 1,
        status: 'I', 
      },
      {
        titulo: 'A',
        autor: 'A',
        id_usuario: 2,
        status: 'D', 
      },
      {
        titulo: 'B',
        autor: 'B',
        id_usuario: 1,
        status: 'D', 
      },
      {
        titulo: 'B',
        autor: 'B',
        id_usuario: 2,
        status: 'I', 
      },

      {
        titulo: 'C',
        autor: 'C',
        id_usuario: 1,
        status: 'I', 
      },
      {
        titulo: 'C',
        autor: 'C',
        id_usuario: 3,
        status: 'D', 
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('livros', null, {});
  },
};
