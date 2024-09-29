'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash('senha123', 10);
    const hashedPassword2 = await bcrypt.hash('senha123', 10);
    const hashedPassword3 = await bcrypt.hash('senha123', 10);
    
    await queryInterface.bulkInsert('usuarios', [
      { id: 1, nome: 'Usuário 1', email: 'usuario1@example.com', senha: hashedPassword1 },
      { id: 2, nome: 'Usuário 2', email: 'usuario2@example.com', senha: hashedPassword2 },
      { id: 3, nome: 'Usuário 3', email: 'usuario3@example.com', senha: hashedPassword3 }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
