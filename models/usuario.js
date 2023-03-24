const mongodb = require('mongodb');
const getBD = require('../util/basedatos').getBD;

const ObjectId = mongodb.ObjectId;

class Usuario {
  constructor(nombreusuario,email) {
    this.nombre = nombreusuario;
    this.email = email;
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
}
module.exports = Usuario;