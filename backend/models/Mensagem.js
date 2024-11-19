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
          type: DataTypes.STRING,
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
    //   Livro.belongsTo(models.Usuario, {
    //     foreignKey: "id_usuario",
    //     as: "usuario",
    //   });
    };
  
    return Mensagem;
  };