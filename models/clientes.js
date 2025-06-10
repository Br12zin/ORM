const Sequelize = require('sequelize');
const database = require('../src/db/conn');
const Pedidos = require('./pedidos')

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
// has many - TEM VÁRIOS: neste caso um cliente pode ter vávios pedidos
clientes.hasMany(Pedidos, { as: 'pedidos' })

// belongs To - PERTENCE A: cada pedido pertence à SOMENTE um cliente
Pedidos.belongsTo(clientes, { foreignKey: 'clienteId' })


module.exports = clientes;