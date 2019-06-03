
const express = require('express');

let app = express();

let Categoria = require('../models/categoria');

//=================================
//Obtener los Categoria
//=================================
app.get( '/services/categoria', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    Categoria.find({estatus: true})
        .skip(desde)
        .limit(limite)
        // .populate('categoria')
        .exec( (err, categoria) => {
            if( err ){
                return res.json({
                    ok: false, 
                    err
                });
            };

            Categoria.countDocuments( {}, (err, conteo) => {
                res.json({
                    ok: true, 
                    categoria, 
                    cuantos : conteo
                });
            });
        });

});


//=================================
//Obten Categoria por ID
//=================================

app.get('/services/categoria/:id', (req, res) => {

    let id = req.params.id;

    Categoria.findById(id)
        .exec( (err, categoriaDB) => {
            if( err ){
                return res.status(500).json({
                    ok: false, 
                    err
                });
            };

            if( !categoriaDB ){
                return res.status(400).json({
                    ok: false, 
                    message: 'La categoria no existe'
                });
            }

            res.status(200).json({
                ok: true, 
                categoria: categoriaDB
            });

        });


});

//========================
//Buscar categoria por nombre
//========================
app.get('/services/categoria/termino/:termino', (req, res) => {

    let termino = req.params.termino; 

    let regex = new RegExp(termino, 'i'); //La i es para que se insencible aminusculas y mayu

    Categoria.find({ nombre: regex})
        .exec( (err, categoria) => {
            if( err ){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            Categoria.countDocuments( {nombre: regex}, (err, conteo) => {
                res.json({
                    ok: true, 
                    categoria, 
                    cuantos : conteo
                });
            });

        })
});


//=================================
//Crear un categoria 
//=================================
app.post('/services/categoria', (req, res) => {

    let body = req.body;

    categoria = new Categoria({
        nombre : body.nombre, 
        descripcion : body.descripcion
    });

    

    categoria.save( ( err, categoriaSave ) => {
        if( err ){
            console.log("Error", err);
            return res.status(500).json({
                ok: false, 
                err
            })
        };

        if( !categoriaSave ){
            return res.status(400).json({
                ok: false, 
                err
            })
        };

        res.status(200).json({
            ok: true, 
            categoria: categoriaSave, 
            message : 'Creado satisfactoriamente'
        });

    });

});


//========================
//Actualizar un categoria
//========================
app.put('/services/categoria/:id', (req, res) => {
    
    let id = req.params.id;
    let body = req.body;

    Categoria.findByIdAndUpdate(id, body, (err, categoriaDB) => {

        if ( err ){
            res.json({
                ok: false, 
                err
            });
        };

        res.json({
            ok: true, 
            message: "Categoria Actualizada"
        })

    })

});


//========================
//Borrar un categoria
//========================
app.delete('/services/categoria/:id', (req, res) => {
    //Solo se va a cambiar el estado de disponible

    let id = req.params.id;

    Categoria.findById( id, ( err, categoriaDB ) => {
        if( err ){
            return res.status(500).json({
                ok: false,
                err
            })
        };

        if( !categoriaDB ){
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'La categoria no existe'
                }
            })
        };

        categoriaDB.estatus = false;

        categoriaDB.save( ( err, categoriaBorrado ) => {

            if( err ){
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            res.json({
                ok:true, 
                categoria: categoriaBorrado,
                message: 'Categoria borrada'
            })

        })
    })


});


module.exports = app;