
const express = require('express');

let app = express();

let Producto = require('../models/producto');


//=================================
//Crear un producto 
//=================================
app.post('/services/productos', (req, res) => {

    let body = req.body;

    producto = new Producto({
        clave : body.clave, 
        nombre : body.nombre, 
        descripcion : body.descripcion, 
        // categoria : req.categoria._id, 
        perecedero : body.perecedero, 
        disponible : body.disponible, 

    });

    

    producto.save( ( err, productoSave ) => {
        if( err ){
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


module.exports = app;