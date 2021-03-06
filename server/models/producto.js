var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productoSchema = new Schema({
    clave: {
        type : String, 
        unique: true,
        required: [true, 'La clave es necesaria']
    }, 
    nombre : {
        type : String, 
        required : [true, 'El nombre es necesario']
    }, 
    descripcion : {
        type : String
    }, 
    categoria : {
        type : Schema.Types.ObjectId,
        ref : 'Categoria',
        required : false
    }, 
    proveedor : {
        type : Schema.Types.ObjectId,
        ref : 'Proveedor',
        required : [true, 'Requiere un proveedor']
    },
    perecedero : {
        type : Number,
        default : 0
    }, 
    disponible : {
        type : Number
    }, 
    medida : {// Kg : kilogramo, Ltr : litro, Pza : pieza
        type: String, 
    },
    estatus : {
        type : Boolean, 
        default : true
    }
});


module.exports = mongoose.model('Producto', productoSchema);