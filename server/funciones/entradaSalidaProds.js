
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
let updateProdEnt =  ( data, idEntrada) => {

    let body = data;

    ProdEntrada.updateOne({idEntrada : idEntrada, idProducto: body.id}, body, (err, prodEntradaDB) => {

        if ( err ){
            throw new Error ({
                ok: false, 
                err
            });
        };

        return {
            ok: true, 
            message: "Actualizado"
        }

    })

};

//=================================
//Obtiene un producto entrada po ID
//=================================
// getProdEntById = (idEntrada, idProd) => {
//     ProdEntrada.find({ idEntrada : idEntrada,  tipo: "Entrada" })
//         .populate({
//             path: 'idProducto', 
//             model: 'Producto',
//             select: 'nombre'
//         })
//         .exec( (err, prodEntrada) => {
//             if( err ){
//                 return res.json({
//                     ok: false, 
//                     err
//                 });
//             };

//             ProdEntrada.countDocuments( { idEntrada : idEntrada, tipo: "Entrada" }, (err, conteo) => {
//                 res.json({
//                     ok: true, 
//                     prodEntrada, 
//                     cuantos : conteo
//                 });
//             });
//         });
// }


//=================================
//Verifica que el producto exista, si no existe lo inserta, si existe lo actualiza con los datos recibidos
//=================================
insUpdProds = (idEntrada, productos) => {

    productos.forEach( producto => {
        // console.log("Producto :) : ", producto);

        ProdEntrada.countDocuments( { idEntrada : idEntrada, idProducto: producto.id  , tipo: "Entrada" }, (err, conteo) => {
            console.log("Conteo  : ", conteo);
            if( conteo > 0 ){
               //Edita el producto
               updateProdEnt(producto, idEntrada);
            }else{                
                 // Agrega el pRODUCTO
                 insertProdEnt(producto, idEntrada);
            }
        });

    })

}


module.exports = {
    insertProdEnt, 
    insUpdProds
}