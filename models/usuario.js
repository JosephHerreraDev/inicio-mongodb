const mongodb = require('mongodb');
const getBD = require('../util/basedatos').getBD;

const ObjectId = mongodb.ObjectId;

class Usuario {
  constructor(nombreusuario, email, carrito, id) {
    this.nombre = nombreusuario;
    this.email = email;
    this.carrito = carrito;
    this._id = id;
  }
  guardar() {
    const bd = getBD();
    return bd.collection('usuarios').insertOne(this);
  }
  static encontrarById(idUsuario) {
    const bd = getBD();
    return bd
      .collection('usuarios')
      .findOne({ _id: new ObjectId(idUsuario) })
      .then(usuario => {
        console.log(usuario);
        return usuario;
      })
      .catch(err => {
        console.log(err);
      });
  }
  agregarACarrito(producto) {
    const carritoActualizado = {articulos: new ObjectId(producto._id), cantidad: 1};
    const bd = getBD();
    return bd
      .collection('usuarios')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { carrito: carritoActualizado } }
      );
  }
}
module.exports = Usuario;