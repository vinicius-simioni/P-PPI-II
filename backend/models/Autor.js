module.exports = (sequelize, DataTypes) => {
  const Autor = sequelize.define(
    "Autor",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "autores",
      timestamps: false,
    }
  );

  return Autor;
};
