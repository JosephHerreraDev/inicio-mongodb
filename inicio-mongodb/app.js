const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const controladorError = require('./controllers/error');
const conectarMongo = require('./util/basedatos').conectarMongo;

// const Usuario = require('./models/usuario');

const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // Usuario.encontarPorId(1)
    //   .then(usuario => {
    //     req.usuario = usuario;
    //     next();
    //   })
    //   .catch(err => console.log(err));
    next();
  });

// app.use('/admin', adminRoutes);
// app.use(tiendaRoutes);

app.use(controladorError.get404);

conectarMongo(() => {
  app.listen(3000);
});


