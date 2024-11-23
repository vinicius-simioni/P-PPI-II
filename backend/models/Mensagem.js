module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define(
    "Mensagem",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      texto: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      id_emissor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_receptor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "mensagem",
      timestamps: true,
    }
  );

  Mensagem.associate = (models) => {
    Mensagem.belongsTo(models.Usuario, {
      foreignKey: "id_emissor",
      as: "emissor",
    });
    Mensagem.belongsTo(models.Usuario, {
      foreignKey: "id_receptor",
      as: "receptor",
    });
  };

  return Mensagem;
};
