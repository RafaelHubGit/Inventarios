
let ProdEntrada = require('../models/entradaSalidaProds');

//=================================
//Crear un producto 
//=================================
let insertProdEnt =  ( data, id) => {

    let body = data;

    prodEntrada = new ProdEntrada({
        tipo : "Entrada", 
        idEntrada : id, 
        idProducto : body.id, 
        cantidad : body.cantidad
    });

    prodEntrada.save( (err, ProdEntradaSave) => {

        if( err ){
           throw new Error ({
               error: {
                   code : 400, 
                   err
               }
           });
            
        }

        if( !ProdEntradaSave ){
            throw new Error ({
                error: {
                    code : 500, 
                    message : 'No se pudo crear el Producto'
                }
            });
        }

        return {
            ProdEntradaSave,
            message : "Creado con exito"
        };

    });

};


//=================================
//Edita un Producto 
//=================================
let updateProdEnt =  ( data, id) => {

    // let id = id;
    let body = data;

    console.log("ID : ", id);
    console.log("DATOS : ", body);

    // Categoria.findByIdAndUpdate(id, body, (err, categoriaDB) => {

    //     if ( err ){
    //         res.json({
    //             ok: false, 
    //             err
    //         });
    //     };

    //     res.json({
    //         ok: true, 
    //         message: "Categoria Actualizada"
    //     })

    // })

};

//=================================
//Obtiene un producto entrada po ID
//=================================
getProdEntById = (idEntrada, idProd) => {
    ProdEntrada.find({ idEntrada : idEntrada,  tipo: "Entrada" })
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
}


//=================================
//Verifica que el producto exista, si no existe lo inserta, si existe lo actualiza con los datos recibidos
//=================================
insUpdProds = (idEntrada, productos) => {

    productos.forEach( producto => {
        console.log("Producto :) : ", producto);
    })

}


module.exports = {
    insertProdEnt, 
    insUpdProds
}