
const express = require('express');

let app = express();

let ProdEntrada = require('../models/entradaSalidaProds');


//=================================
//Obtener los ProdEntrada
//=================================
app.get( '/services/prodEntrada/:idEntrada', (req, res) => {

    let idEntrada = req.params.idEntrada;

    ProdEntrada.find({ idEntrada : idEntrada, tipo: "Entrada" })
        .populate({
            path: 'idProducto', 
            model: 'Producto',
            select: 'nombre'
        })
        .exec( (err, prodEntrada) => {
            if( err ){
                return res.json({
                    ok: false, 
                    err
                });
            };

            ProdEntrada.countDocuments( { idEntrada : idEntrada, tipo: "Entrada" }, (err, conteo) => {
                res.json({
                    ok: true, 
                    prodEntrada, 
                    cuantos : conteo
                });
            });
        });

});


//=================================
//Obten ProdEntrada por ID
//=================================

// app.get('/services/ProdEntrada/:id', (req, res) => {

//     let id = req.params.id;

//     ProdEntrada.findById(id)
//         .exec( (err, ProdEntradaDB) => {
//             if( err ){
//                 return res.status(500).json({
//                     ok: false, 
//                     err
//                 });
//             };

//             if( !ProdEntradaDB ){
//                 return res.status(400).json({
//                     ok: false, 
//                     message: 'La ProdEntrada no existe'
//                 });
//             }

//             res.status(200).json({
//                 ok: true, 
//                 ProdEntrada: ProdEntradaDB
//             });

//         });


// });

//========================
//Buscar ProdEntrada por nombre
//========================
app.get('/services/prodEntrada/termino/:termino', (req, res) => {

    let termino = req.params.termino; 

    let regex = new RegExp(termino, 'i'); //La i es para que se insencible aminusculas y mayu

    ProdEntrada.find({ nombre: regex})
        .exec( (err, ProdEntrada) => {
            if( err ){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            ProdEntrada.countDocuments( {nombre: regex}, (err, conteo) => {
                res.json({
                    ok: true, 
                    ProdEntrada, 
                    cuantos : conteo
                });
            });

        })
});



//=================================
//Crear un producto 
//=================================
app.post('/services/prodEntrada', (req, res) => {

    let body = req.body;

    prodEntrada = new ProdEntrada({
        tipo : body.tipo, 
        idEntrada : body.idEntrada, 
        idProducto : body.idProducto, 
        cantidad : body.cantidad
    });

    // console.log(ProdEntrada);

    prodEntrada.save( (err, ProdEntradaSave) => {
        if( err ){
            return res.status(400).json({
                ok: false, 
                err
            });
        }

        if( !ProdEntradaSave ){
            return res.status(500).json({
                ok: false, 
                message : 'No se pudo crear'
            })
        }


        res.status(200).json({
            ok:true,
            ProdEntrada : ProdEntradaSave,
            message : 'Creado con exito'
        })

    });

});


module.exports = app;