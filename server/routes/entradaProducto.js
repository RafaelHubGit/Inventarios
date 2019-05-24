
const express = require('express');

let app = express();

let Entrada = require('../models/entradaProducto');

//=================================
//Crear un producto 
//=================================
app.post('/services/entrada', (req, res) => {

    let body = req.body;

    entrada = new Entrada({
        proveedor : body.proveedor, 
        fechaEntrada : body.fechaEntrada, 
        responsableEntrega : body.responsableEntrega, 
        responsableRecibe : body.responsableRecibe, 
        tipoDocto : body.tipoDocto, 
        noDocto : body.noDocto, 
        productos : body.productos
    });

    // console.log(entrada);

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


        res.status(200).json({
            ok:true,
            entrada : entradaSave,
            message : 'Creado con exito'
        })

    });

});


module.exports = app;