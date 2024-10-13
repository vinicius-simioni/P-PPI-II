"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("livros", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      autor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "usuarios",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("livros");
  },
};
