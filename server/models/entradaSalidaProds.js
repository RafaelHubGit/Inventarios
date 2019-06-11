var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var entradaSalidaProdSchema = new Schema({
    tipo : {
        type: String, 
        required: [true, 'Debe establecer si es Entrada o Salida']
    }, 
    idEntrada : {
        type : Schema.Types.ObjectId,
        ref : 'entradaTkt'
        // required: [true, 'Debe estar ligado a una Entrada']
    },
    idSalida : {
        type : Schema.Types.ObjectId,
        ref : 'salidaTkt'
        // required: [true, 'Debe estar ligado a una Salida']
    },
    idProducto : {
        type : Schema.Types.ObjectId,
        ref : 'producto',
        required: [true, 'Debe estar ligado a un Producto']
    },
    cantidad : {
        type : Number, 
        default: 0
    }
});

module.exports = mongoose.model('EntradaSalidaProd', entradaSalidaProdSchema);