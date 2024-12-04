"use strict";

module.exports = (sequelize, DataTypes) => {
  const Troca = sequelize.define('Troca', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_remetente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_destinatario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_livro_proposto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_livro_interesse: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    texto_proposta: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    tableName: 'trocas',
    timestamps: false, 
  });

  Troca.associate = (models) => {
    Troca.belongsTo(models.Usuario, {
      foreignKey: 'id_remetente',
    });

    Troca.belongsTo(models.Usuario, {
      foreignKey: 'id_destinatario',
    });

    Troca.belongsTo(models.Livro, {
      foreignKey: 'id_livro_proposto',
    });

    Troca.belongsTo(models.Livro, {
      foreignKey: 'id_livro_interesse',
    });
  };

  return Troca;
};
