const Sequelize = require('sequelize');

const sequelize = require('../util/basedatos');

const ArtilculoCarrito = sequelize.define('articuloCarrito', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  cantidad: Sequelize.INTEGER
});

module.exports = ArtilculoCarrito;