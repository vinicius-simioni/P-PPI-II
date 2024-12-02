module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('livros', 'status', {
      type: Sequelize.ENUM('D', 'I'),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('livros', 'status');
  },
};
