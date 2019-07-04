
const express = require('express');

let app = express();

let Entrada = require('../models/entradaTkt');
let entProd = require('../models/entradaSalidaProds');

const {insertProdEnt, insUpdProds, deleteAllProdEnt} = require('../funciones/entradaSalidaProds');
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
            return res.status(400).json({
                ok: false, 
                err
            });
        }

        if( !entradaSave ){
            return res.status(500).json({
                ok: false, 
                message : 'No se pudo crear'
            })
        }

        productos.forEach( (producto) => {
            insertProdEnt(producto, entradaSave._id);
        });
        

        res.status(200).json({
            ok:true,
            entrada : entradaSave,
            message : 'Creado con exito'
        });



    });

});

//========================
//Actualizar un Entrada
//========================
app.put('/services/entrada/:id', (req, res) => {

    let body = req.body;

    let id = body.idEntrada;

    let entrada = {
        proveedor : body.idProveedor, 
        fechaEntrada : fechaIsoDate(body.fecha), 
        responsableEntrega : body.entrega, 
        responsableRecibe : body.recibe, 
        tipoDocto : body.tipoDoc, 
        noDocto : body.noDocto
    };

    let productos = body.productos;

    Entrada.findByIdAndUpdate(id, entrada, (err, entradaDB) => {

        if ( err ){
            return res.json({
                ok: false, 
                err
            });
        };

        insUpdProds(id, productos);

        res.json({
            ok: true,
            entrada : entradaDB,
            message: "Entrada Actualizada"
        })

    })

});

//========================
//Elimina la entrada
//========================
app.delete('/services/entrada/:id', (req, res) => {

    let id = req.params.id;

    Entrada.deleteOne({ _id: id }, (err, entradaDB) => {

        if(err){
            return res.json({
                ok: false, 
                err
            });
        }

        deleteAllProdEnt(id);
        res.json({
            ok: true,
            message: "Entrada Eliminada"
        })
    });

});

module.exports = app;