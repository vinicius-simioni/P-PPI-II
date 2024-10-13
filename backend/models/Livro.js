module.exports = (sequelize, DataTypes) => {
  const Livro = sequelize.define(
    "Livro",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "livros",
      timestamps: false,
    }
  );

  Livro.associate = (models) => {
    Livro.belongsTo(models.Usuario, {
      foreignKey: "id_usuario",
      as: "usuario",
    });
  };

  return Livro;
};
