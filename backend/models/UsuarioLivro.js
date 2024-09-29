module.exports = (sequelize, DataTypes) => {
  const UsuarioLivro = sequelize.define(
    "UsuarioLivro",
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
      id_livros: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.CHAR(1), // D = disponível | I = interesse
        allowNull: true,
      },
    },
    {
      tableName: "usuarios_livros",
      timestamps: false,
    }
  );

  return UsuarioLivro;
};
