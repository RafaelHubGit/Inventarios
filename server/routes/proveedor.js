
const express = require('express');

let app = express();

let Proveedor = require('../models/proveedor');

//=================================
//Obtener los proveedores
//=================================
app.get( '/services/proveedor', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    Proveedor.find({})
        .skip(desde)
        .limit(limite)
        // .populate('categoria')
        .exec( (err, proveedor) => {
            if( err ){
                return res.json({
                    ok: false, 
                    err
                });
            };

            Proveedor.countDocuments( {}, (err, conteo) => {
                res.json({
                    ok: true, 
                    proveedor, 
                    cuantos : conteo
                });
            });
        });

});


//=================================
//Obten proveedor por ID
//=================================

app.get('/services/proveedor/:id', (req, res) => {

    let id = req.params.id;

    Proveedor.findById(id)
        // .populate('categoria')
        .exec( (err, proveedorDB) => {
            if( err ){
                return res.status(500).json({
                    ok: false, 
                    err
                });
            };

            if( !proveedorDB ){
                return res.status(400).json({
                    ok: false, 
                    message: 'El proveedor no existe'
                });
            }

            res.status(200).json({
                ok: true, 
                proveedor: proveedorDB
            });

        });


});

//========================
//Buscar proveedor por nombre
//========================
app.get('/services/proveedor/termino/:termino', (req, res) => {

    let termino = req.params.termino; 

    let regex = new RegExp(termino, 'i'); //La i es para que se insencible aminusculas y mayu

    Proveedor.find({ nombre: regex})
        .exec( (err, proveedores) => {
            if( err ){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            Proveedor.countDocuments( {nombre: regex}, (err, conteo) => {
                res.json({
                    ok: true, 
                    proveedores, 
                    cuantos : conteo
                });
            });

        })
});


//=================================
//Crear un proveedor 
//=================================
app.post('/services/proveedor', (req, res) => {

    let body = req.body;

    proveedor = new Proveedor({
        nombre : body.nombre
    });

    

    proveedor.save( ( err, proveedorSave ) => {
        if( err ){
            return res.status(500).json({
                ok: false, 
                err
            })
        };

        if( !proveedorSave ){
            return res.status(400).json({
                ok: false, 
                err
            })
        };

        res.status(200).json({
            ok: true, 
            proveedor: proveedorSave, 
            message : 'Creado satisfactoriamente'
        });

    });

});


//========================
//Actualizar un proveedor
//========================
app.put('/services/proveedor/:id', (req, res) => {
    
    let id = req.params.id;
    let body = req.body;

    Proveedor.findOneAndUpdate(id, body, ( err, provUpd) => {

        if( err ){
            return res.status(500).json({
                ok: false,
                err
            })
        };

        res.json({
            ok: true, 
            message: 'Proveedor actualizado'
        })

    })

});


//========================
//Borrar un produccto
//========================
app.delete('/services/proveedor/:id', (req, res) => {
    //Solo se va a cambiar el estado de disponible

    let id = req.params.id;

    Proveedor.findById( id, ( err, proveedorDB ) => {
        if( err ){
            return res.status(500).json({
                ok: false,
                err
            })
        };

        if( !proveedorDB ){
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El proveedor no existe'
                }
            })
        };

        proveedorDB.estatus = false;

        proveedorDB.save( ( err, proveedorBorrado ) => {

            if( err ){
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            res.json({
                ok:true, 
                proveedor: proveedorBorrado,
                message: 'Proveedor borrado'
            })

        })
    })


});


module.exports = app;