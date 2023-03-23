const Producto = require('../models/producto');

exports.getAgregarProducto = (req, res, next) => {
    res.render('admin/editar-producto', { 
      tituloPagina: 'Agregar Productos',
      ruta: '/admin/agregar-producto',
      edicion: false
    });
  };

exports.postAgregarProducto = (req, res, next) => {
  const titulo = req.body.titulo;
  const urlImagen = req.body.urlImagen;
  const precio = req.body.precio;
  const desc = req.body.descripcion;
  const producto = new Producto(titulo, precio, desc, urlImagen);
  producto.guardar()
  .then (resultado => {
    console.log("Producto Creado");
    res.redirect('/admin/productos');
  })
  .catch(err => {
    console.log(err);
  });
};

// exports.getEditarProducto = (req, res, next) => {
//   const modoEditar = req.query.editar;
//   if(!modoEditar) {
//     return res.redirect('/');
//   }
//   const idProd = req.params.idProducto;

//   req.usuario
//     .getProductos({ where: {id: idProd}})
//     .then(productos => {
//       const producto = productos[0];
//       if(!producto) {
//         return res.redirect('/');
//       }
//       res.render('admin/editar-producto', { 
//         tituloPagina: 'Editar Producto',
//         ruta: '/admin/editar-producto',
//         edicion: modoEditar,
//         producto: producto
//       });
//     })
//     .catch(err => console.log(err)); 
// };

// exports.postEditarProducto = (req, res, next) => {
//   const idProd = req.body.idProducto;
//   const tituloActualizado = req.body.titulo;
//   const precioActualizado = req.body.precio;
//   const urlImagenActualizada = req.body.urlImagen;
//   const descActualizada = req.body.descripcion;
//   Producto.encontrarPorId(idProd)
//     .then(producto => {
//       producto.titulo = tituloActualizado;
//       producto.precio = precioActualizado;
//       producto.descripcion = descActualizada;
//       producto.urlImagen = urlImagenActualizad;
//       return producto.guardar();
//     })
//     .then(resultado => {
//       console.log('PRODUCTO ACTUALIZADO');
//       res.redirect('/admin/productos');
//     })
//     .catch(err => console.log(err));
// };

exports.getProductos = (req, res, next) => {
    Producto.mostrarTodo()
    .then(productos => {
      res.render('admin/productos', {
        prods: productos,
        tituloPagina: 'Administrar Productos',
        ruta: '/admin/productos'
      });
    })
    .catch(err => console.log(err));
};

// exports.postBorrarProducto = (req, res, next) => {
//   const idProd = req.body.idProducto;
//   Producto.borrarPorId(idProd)
//     .then(producto => {
//       return producto.destroy();
//     })
//     .then(resultado => {
//       console.log('PRODUCTO DESTRUIDO');
//       res.redirect('/admin/productos');
//     })
//     .catch(err => console.log(err));
// };