'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mensagem', [
      {
        texto: 'Oi, como vai?',
        id_emissor: 1,
        id_receptor: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mensagem', null, {});
  },
};
