const getBD = require('../util/database').getDb;

class Producto{
  constructor(titulo, precio, descripcion, urlImagen){
    this.titulo = titulo;
    this.precio = precio;
    this.descripcion = descripcion;
    this.urlImagen = urlImagen;
  }
  guardar(){
    const db = getBD();
    return db.collection('productos')
    .insertOne(this)
    .then(resultado => {
      console.log(resultado);
    })
    .catch(err => {
      console.log(err);
    });
  }
}

module.exports = Producto;