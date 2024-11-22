module.exports = (sequelize, DataTypes) => {
  const Avaliacao = sequelize.define(
    "Avaliacao",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_usuario_avaliado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_usuario_avaliador: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nota: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      comentario: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "avaliacoes",
      timestamps: true,
    }
  );

  Avaliacao.associate = (models) => {
    Avaliacao.belongsTo(models.Usuario, {
      foreignKey: "id_usuario_avaliado",
      as: "avaliado",
    });
    Avaliacao.belongsTo(models.Usuario, {
      foreignKey: "id_usuario_avaliador",
      as: "avaliador",
    });
  };

  return Avaliacao;
};
