module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'usuarios',
    timestamps: false
  });

  return Usuario;
};
