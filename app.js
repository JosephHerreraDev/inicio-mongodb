const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const controladorError = require('./controllers/error');
const rutasTienda = require('./routes/tienda');
const adminRoutes = require('./routes/admin');
const conectarMongo = require('./util/basedatos').conectarMongo;
const Usuario = require('./models/usuario');

const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  Usuario.encontarPorId('604baee8ca5e35d5ba709c6b')
    .then(usuario => {
      req.usuario = new Usuario(
        usuario.nombre,
        usuario.email,
        usuario.carrito,
        usuario._id
      );
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);

app.use(rutasTienda);

// app.use('/admin', adminRoutes);
// app.use(tiendaRoutes);

app.use(controladorError.get404);

conectarMongo(() => {
  app.listen(3000);
});


