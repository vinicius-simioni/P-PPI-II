'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mensagens', [
      {
        texto: 'Oi, como vai?',
        id_emissor: 1,
        id_receptor: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        texto: 'Estou bem, e você?',
        id_emissor: 2,
        id_receptor: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        texto: 'Gostei do livro 1',
        id_emissor: 1,
        id_receptor: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mensagens', null, {});
  },
};
