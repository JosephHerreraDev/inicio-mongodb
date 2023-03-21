const Sequelize = require('sequelize');

const sequelize = require('../util/basedatos');

const Orden = sequelize.define('orden', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Orden;
