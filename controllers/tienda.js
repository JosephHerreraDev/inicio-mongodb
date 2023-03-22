const Producto = require('../models/producto');

exports.getProductos = (req, res, next) => {
  Producto.mostrarTodo()
  .then(productos => {
    res.render('tienda/lista-productos', {
      prods: productos,
      tituloPagina : 'Todos los productos',
      ruta: '/productos'
    }); 
  })
  .catch(err => { 
    console.log(err);
  });
};

exports.getProducto = (req, res, next) => {
  const idProd = req.params.idProducto;
  Producto.encontrarPorId(idProd)
  .then(producto => {
      res.render('tienda/detalle-producto', {
        producto: producto[0],
        tituloPagina: producto.titulo,
        ruta: "/productos"
      });   
  })
  .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Producto.mostrarTodo()
  .then( productos => {
    res.render('tienda/index', {
      prods: productos,
      tituloPagina : 'Tienda',
      ruta: '/'
    }); 
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getCarrito = (req, res, next) => {
  req.usuario
    .getCarrito()
    .then(carrito => {
      return carrito
        .getProductos()
        .then(productos => {
          res.render('tienda/carrito' , {        
            ruta: '/carrito',
            tituloPagina: 'Su Carrito',
            productos: productosCarrito
          });
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));    
};

exports.postCarrito = (req, res, next) => {
  const idProd = req.body.idProducto;
  let obtenerCarrito;
  let nuevaCantidad = 1;
  req.usuario
    .getCarrito()
    .then(carrito => {
      obtenerCarrito = carrito;
      return carrito.getProductos({ where: { id: idProd } });
    })
    .then(productos => {
      let producto;
      if (productos.length > 0) {
        producto = productos[0];
      }

      if (producto) {
        const cantidadAnterior = producto.articuloCarrito.cantidad;
        cantidadNueva = cantidadAnterior + 1;
        return producto;
      }
      return Producto.encontrarPorId(idProd);
    })
    .then(producto => {
      return obtenerCarrito.agregarProducto(producto, {
        through: { cantidad: cantidadNueva }
      });
    })
    .then(() => {
      res.redirect('/carrito');
    })
    .catch(err => console.log(err));
};

exports.postBorrarArticuloCarrito = (req, res, next) => {
  const idProd = req.body.idProducto;
  req.usuario
    .getCarrito()
    .then(carrito => {
      return carrito.getProductos({ where: { id: idProd } });
    })
    .then(productos => {
      const producto = productos[0];
      return producto.articuloCarrito.destroy();
    })
    .then(resultado => {
      res.redirect('/carrito');
    })
    .catch(err => console.log(err));
};

exports.postOrden = (req, res, next) => {
  let obtenerCarrito;
  req.usuario
    .getCarritot()
    .then(carrito => {
      obtenerCarrito = carrito;
      return carrito.getProductos();
    })
    .then(productos => {
      return req.usuario
        .crearOrden()
        .then(orden => {
          return orden.agregarProductos(
            productos.map(producto => {
              producto.orderItem = { cantidad: producto.articuloCarrito.cantidad };
              return producto;
            })
          );
        })
        .catch(err => console.log(err));
    })
    .then(resultado => {
      return obtenerCarrito.setProductos(null);
    })
    .then(resultado => {
      res.redirect('/ordenes');
    })
    .catch(err => console.log(err));
};

exports.getOrdenes = (req, res, next) => {
  req.usuario
  .getOrdenes({ include: ['productos']})
  .then(ordenes => {
    res.render('tienda/ordenes' , {
      ruta: '/ordenes',
      tituloPagina: 'Sus Ordenes'
    });
  })
  .catch(err => console.log(err));  
};