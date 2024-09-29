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
      id_autor: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_editora: {
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
    Livro.belongsTo(models.Autor, { foreignKey: "id_autor" });
    Livro.belongsTo(models.Editora, { foreignKey: "id_editora" });
  };

  return Livro;
};
