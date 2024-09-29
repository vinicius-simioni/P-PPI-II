module.exports = (sequelize, DataTypes) => {
  const Avaliacao = sequelize.define(
    "Avaliacao",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_usuarios: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pontualidade: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      conservacao_livro: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      livro_disponivel: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
    },
    {
      tableName: "avaliacoes",
      timestamps: false,
    }
  );

  return Avaliacao;
};
