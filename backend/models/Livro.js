module.exports = (sequelize, DataTypes) => {
  const Livro = sequelize.define(
    "Livro",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      autor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: { 
        type: DataTypes.ENUM('D', 'I'),
        allowNull: false,
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
