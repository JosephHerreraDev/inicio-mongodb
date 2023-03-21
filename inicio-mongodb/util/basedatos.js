const mongodb = require('mongodb');
const ClienteMongo = mongodb.MongoClient;

const conectarMongo = (callback) => {
  ClienteMongo.connect(
    'mongodb+srv://jose:N0d31234@nodeexpresscluster.5fqzjke.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser:true, useUnifiedTopology: true }  
    )
    .then(cliente => {
      console.log('Conectado!');
      callback(cliente);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = conectarMongo;