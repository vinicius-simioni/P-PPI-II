'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trocas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_remetente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios', 
          key: 'id',          
        },
        onDelete: 'CASCADE',  
      },
      id_destinatario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        onDelete: 'CASCADE',  
      },
      id_livro_proposto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'livros',    
          key: 'id',          
        },
        onDelete: 'CASCADE',  
      },
      id_livro_interesse: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'livros',
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      texto_proposta: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trocas');
  }
};
