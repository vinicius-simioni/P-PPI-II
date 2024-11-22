'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('avaliacoes', [
      {
        id_usuario_avaliado: 2,
        id_usuario_avaliador: 1,
        nota: 5,
        comentario: 'Usuário muito confiável, tudo ocorreu perfeitamente!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usuario_avaliado: 3,
        id_usuario_avaliador: 1,
        nota: 4,
        comentario: 'A troca foi boa, mas demorou para responder.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_usuario_avaliado: 2,
        id_usuario_avaliador: 3,
        nota: 3,
        comentario: 'O item não estava como descrito.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('avaliacoes', null, {});
  },
};
