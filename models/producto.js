const getBD = require('../util/basedatos').getBD;

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

  static mostrarTodo(){
    const db = getBD();
    return db.collection('productos')
    .find()
    .toArray()
    .then(productos => {
      console.log(productos);
      return productos;
    })
    .catch(err => {
      console.log(err);
    });
  }
}

module.exports = Producto;