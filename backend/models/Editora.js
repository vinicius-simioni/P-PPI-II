module.exports = (sequelize, DataTypes) => {
  const Editora = sequelize.define(
    "Editora",
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
      tableName: "editora",
      timestamps: false,
    }
  );

  return Editora;
};
