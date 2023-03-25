const mongodb = require('mongodb');
const getBD = require('../util/basedatos').getBD;

class Producto{
  constructor(titulo, precio, descripcion, urlImagen, id, idUsuario){
    this.titulo = titulo;
    this.precio = precio;
    this.descripcion = descripcion;
    this.urlImagen = urlImagen;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.idUsuario = idUsuario;
  }
  guardar(){
    const db = getBD();
    let dbOp;
    if(this._id){
      dbOp = bd
      .collection('productos')
      .updateOne({_id: this._id}, {$set: this});
    } else {
      dbOp = db
      .collection('productos')
      .insertOne(this);
    }
    return dbOp
    .then(resultado => {
      console.log(resultado);
    })
    .catch(err => {
      console.log(err);
    });
  }

  static mostrarTodo(){
    const bd = getBD();
    return bd
    .collection('productos')
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
  static encontrarPorId(idProd){
    const db = getBD();
    return db
    .collection('productos')
    .find({_id: new mongodb.ObjectId(idProd)})
    .next()
    .then(producto => {
      console.log(producto);
      return producto;
    })
    .catch(err => {
      console.log(err);
    });
  }
  static eliminarPorId(idProd){
    const db = getBD();
    return db
    .collection('productos')
    .deleteOne({_id: new mongodb.ObjectId(idProd)})
    .then(result => {
      console.log('Producto eliminado');
    })
    .catch(err => {
      console.log(err);
    });
  }
  getcarrito(){
    const db = getBD();
    const idsProducto = this.carrito.articulos.map(a => {
      return a.idProducto;
    })
    return db
    .collection('productos')
    .find({_id: {$in: idsProducto}})
    .toArray()
    .then(productos => {
      return productos.map(p => {
        return {
          ...p, 
          cantidad: this.carrito.articulos.find(a => {
          return a.idProducto.toString() === p._id.toString();
        }).cantidad
      };
      });
    });
  }
}

module.exports = Producto;