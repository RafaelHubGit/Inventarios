
const express = require('express');

let app = express();

let Entrada = require('../models/entradaTkt');
let entProd = require('../models/entradaSalidaProds');

const {insertProdEnt} = require('../funciones/entradaSalidaProds');
const {fechaIsoDate} = require('../funciones/generalFunctions');


//=================================
//Obtener los Entrada
//=================================
app.get( '/services/entrada', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    Entrada.find({})
        .skip(desde)
        .limit(limite)
        // .populate('categoria')
        .populate('proveedor')
        // .populate([{
        //     path: 'productos.producto', 
        //     model: 'Producto',
        //     select: 'nombre'
        // }])
        .exec( (err, entrada) => {
            if( err ){
                return res.json({
                    ok: false, 
                    err
                });
            };

            Entrada.countDocuments( {}, (err, conteo) => {
                res.json({
                    ok: true, 
                    entrada, 
                    cuantos : conteo
                });
            });
        });

});


//=================================
//Obten Entrada por ID
//=================================

app.get('/services/entrada/:id', (req, res) => {

    let id = req.params.id;

    Entrada.findById(id)
        .exec( (err, entradaDB) => {
            if( err ){
                return res.status(500).json({
                    ok: false, 
                    err
                });
            };

            if( !entradaDB ){
                return res.status(400).json({
                    ok: false, 
                    message: 'La entrada no existe'
                });
            }

            res.status(200).json({
                ok: true, 
                entrada: entradaDB
            });

        });


});

//========================
//Buscar Entrada por nombre
//========================
app.get('/services/entrada/termino/:termino', (req, res) => {

    let termino = req.params.termino; 

    let regex = new RegExp(termino, 'i'); //La i es para que se insencible aminusculas y mayu

    Entrada.find({ nombre: regex})
        .exec( (err, entrada) => {
            if( err ){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            Entrada.countDocuments( {nombre: regex}, (err, conteo) => {
                res.json({
                    ok: true, 
                    entrada, 
                    cuantos : conteo
                });
            });

        })
});



//=================================
//Crear un producto 
//=================================
app.post('/services/entrada', (req, res) => {

    let body = req.body;

    let productos = body.productos;

    

    entrada = new Entrada({
        proveedor : body.idProveedor, 
        fechaEntrada : fechaIsoDate(body.fecha), 
        responsableEntrega : body.entrega, 
        responsableRecibe : body.recibe, 
        tipoDocto : body.tipoDoc, 
        noDocto : body.noDocto
    });


    entrada.save( (err, entradaSave) => {
        if( err ){
            console.log("No error : ");
            return res.status(400).json({
                ok: false, 
                err
            });
        }

        if( !entradaSave ){
            console.log("No entrada : ");
            return res.status(500).json({
                ok: false, 
                message : 'No se pudo crear'
            })
        }

        res.status(200).json({
            ok:true,
            entrada : entradaSave,
            message : 'Creado con exito'
        })

        productos.forEach( (producto) => {
            insertProdEnt(producto, entradaSave._id);
        });

    });

});


module.exports = app;