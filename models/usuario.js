const Sequelize = require('sequelize');

const sequelize = require('../util/basedatos');

const Usuario = sequelize.define('usuario', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nombre: Sequelize.STRING,
  email: Sequelize.STRING
});

module.exports = Usuario;