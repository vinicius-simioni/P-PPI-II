"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("avaliacoes", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_usuarios: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
      pontualidade: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      conservacao_livro: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      livro_disponivel: {
        type: Sequelize.TINYINT,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("avaliacoes");
  },
};
