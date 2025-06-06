const Sequelize = require('sequelize');
const database = require('../src/db/conn');

const clientes = database.define('clientes', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    cpf: {
      type: Sequelize.STRING(11),
      unique: true,
      allowNull: false,
    },
    email:{
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
},
  { underscored: true },
  { freezeTableName: true }
)

module.exports = clientes;