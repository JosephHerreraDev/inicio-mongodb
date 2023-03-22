const Sequelize = require('sequelize');

const sequelize = require('../util/basedatos');

const ArticuloOrden = sequelize.define('articuloOrden', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  cantidad: Sequelize.INTEGER
});

module.exports = ArticuloOrden;