const mongodb = require('mongodb');
const ClienteMongo = mongodb.MongoClient;

let _bd;

const conectarMongo = (callback) => {
  ClienteMongo.connect(
    'mongodb+srv://jose:N0d31234@nodeexpresscluster.5fqzjke.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser:true, useUnifiedTopology: true }  
    )
    .then(cliente => {
      console.log('Conectado!');
      _bd = cliente.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw 'No se encontro base de datos';
    });
};

const getBD = () => {
  if (_bd) {
    return _bd;
  }
  throw 'No se encontro base de datos';
}

exports.conectarMongo = conectarMongo;
exports.getBD = getBD;