var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var entradaSchema = new Schema({
    proveedor : {
        type : Schema.Types.ObjectId,
        required:[true, 'Se requiere el proveedor'] //No sra necesario para todos, en este casi si lo requiero
    },
    fechaEntrada : {
        type: Date, 
        default : Date.now
    }, 
    responsableEntrega : {
        type : String
    }, 
    responsableRecibe : {
        type : String
    },
    tipoDocto : { //Para saber el tipo de documento Pueden ser factura 1, remision 2, folio 3 o numeroDocumentoDeAlmacen 4
        type : Number
    }, 
    noDocto : { // El numero del documento que se ingreso
        type : String
    }, 
    productos : [{
        producto : {
            type : Schema.Types.ObjectId,
            ref : 'Producto', 
            required : [true, 'Se requiere el producto']
        },
        cantidad : {
            type : Number, 
            required : [true, 'Se requiere la cantidad del producto']
        }, 
        fechaVencimiento : { //Este es solo si el item es perecedero
            type : Date 
        }
    }]

});