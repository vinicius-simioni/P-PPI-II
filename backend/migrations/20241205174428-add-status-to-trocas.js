'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('trocas', 'status', {
      type: Sequelize.ENUM('pendente', 'aceita', 'recusada'),
      defaultValue: 'pendente', 
      allowNull: false, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('trocas', 'status');
  }
};
