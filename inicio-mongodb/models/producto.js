const Sequelize = require('sequelize');

const sequelize = require('../util/basedatos');
class producto{
  constructor(titulo, precio, descripcion, urlImagen){
    this.titulo = titulo;
    this.precio = precio;
    this.descripcion = descripcion;
    this.urlImagen = urlImagen;
  }
}
const Producto = sequelize.define('producto', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  titulo: Sequelize.STRING,
  precio: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  urlImagen: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descripcion: {
    type: Sequelize.STRING,
    allowNull: false
  }
});