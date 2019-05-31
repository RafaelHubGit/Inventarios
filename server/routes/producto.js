
const express = require('express');

let app = express();

let Producto = require('../models/producto');

//=================================
//Obtener los productos
//=================================
app.get( '/services/productos', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    Producto.find({ estatus:true })
        .skip(desde)
        .limit(limite)
        .populate('categoria', 'nombre')
        .populate('proveedor', 'nombre')
        .exec( (err, producto) => {
            if( err ){
                return res.json({
                    ok: false, 
                    err
                });
            };

            Producto.countDocuments( {}, (err, conteo) => {
                res.json({
                    ok: true, 
                    producto, 
                    cuantos : conteo
                });
            });
        });

});


//=================================
//Obten Producto por ID
//=================================

app.get('/services/productos/:id', (req, res) => {

    let id = req.params.id;

    Producto.findById(id)
        .populate('categoria')
        .exec( (err, productoDB) => {
            if( err ){
                return res.status(500).json({
                    ok: false, 
                    err
                });
            };

            if( !productoDB ){
                return res.status(400).json({
                    ok: false, 
                    message: 'El producto no existe'
                });
            }

            res.status(200).json({
                ok: true, 
                producto: productoDB
            });

        });


});

//========================
//Buscar producto por nombre
//========================
app.get('/services/productos/termino/:termino', (req, res) => {

    let termino = req.params.termino; 

    console.log("Termino : ", termino);

    let regex = new RegExp(termino, 'i'); //La i es para que se insencible aminusculas y mayu

    Producto.find({ nombre: regex})
        .populate('categoria')
        .exec( (err, productos) => {
            if( err ){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            Producto.countDocuments( {nombre: regex}, (err, conteo) => {
                res.json({
                    ok: true, 
                    productos, 
                    cuantos : conteo
                });
            });

            // res.json({
            //     ok:true, 
            //     productos
            // })
        })
});


//=================================
//Crear un producto 
//=================================
app.post('/services/productos', (req, res) => {

    let body = req.body;

    producto = new Producto({
        clave : body.clave, 
        nombre : body.nombre, 
        descripcion : body.descripcion, 
        categoria : body.categoria, 
        proveedor : body.proveedor,
        perecedero : body.perecedero, 
        disponible : body.disponible, 
        medida : body.medida

    });

    console.log("Productos : ", producto);

    producto.save( ( err, productoSave ) => {
        if( err ){
            console.log("Error", err);
            return res.status(500).json({
                ok: false, 
                err
            })
        };

        if( !productoSave ){
            return res.status(400).json({
                ok: false, 
                err
            })
        };

        res.status(200).json({
            ok: true, 
            producto: productoSave, 
            message : 'Creado satisfactoriamente'
        });

    });

});


//========================
//Actualizar un produccto
//========================
app.put('/services/productos/:id', (req, res) => {
    
    let id = req.params.id;
    let body = req.body;

    Producto.findOneAndUpdate(id, body, ( err, prodUpd) => {

        if( err ){
            return res.status(500).json({
                ok: false,
                err
            })
        };

        res.json({
            ok: true, 
            message: 'Producto actualizado'
        })

    })

});


//========================
//Borrar un produccto
//========================
app.delete('/services/productos/:id', (req, res) => {
    //Solo se va a cambiar el estado de disponible

    let id = req.params.id;

    Producto.findById( id, ( err, productoDB ) => {
        if( err ){
            return res.status(500).json({
                ok: false,
                err
            })
        };

        if( !productoDB ){
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            })
        };

        productoDB.estatus = false;

        productoDB.save( ( err, productoBorrado ) => {

            if( err ){
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            res.json({
                ok:true, 
                producto: productoBorrado,
                message: 'Producto borrado'
            })

        })
    })


});


module.exports = app;