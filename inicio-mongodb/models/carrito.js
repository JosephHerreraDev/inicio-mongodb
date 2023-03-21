const Sequelize = require('sequelize');

const sequelize = require('../util/basedatos');

const Carrito = sequelize.define('carrito', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
});

module.exports = Carrito;