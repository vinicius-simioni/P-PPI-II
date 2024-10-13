'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const senhaPadrao = '123123';
    const hashedPassword = await bcrypt.hash(senhaPadrao, 10);

    await queryInterface.bulkInsert('usuarios', [
      { 
        nome: 'Usuário 1', 
        email: 'user1@mail.com', 
        senha: hashedPassword, 
        cidade: 'Cidade A' 
      },
      { 
        nome: 'Usuário 2', 
        email: 'user2@mail.com', 
        senha: hashedPassword, 
        cidade: 'Cidade B' 
      },
      { 
        nome: 'Usuário 3', 
        email: 'user3@mail.com', 
        senha: hashedPassword, 
        cidade: 'Cidade C' 
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
