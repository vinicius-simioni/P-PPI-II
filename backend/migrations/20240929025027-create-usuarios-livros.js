"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("usuarios_livros", {
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
      id_livros: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "livros",
          key: "id",
        },
      },
      status: {
        type: Sequelize.CHAR(1),
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("usuarios_livros");
  },
};
