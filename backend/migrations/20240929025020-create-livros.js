"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("livros", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      id_autor: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "autores",
          key: "id",
        },
      },
      id_editora: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "editora",
          key: "id",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("livros");
  },
};
