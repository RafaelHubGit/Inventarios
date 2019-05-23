var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productoSchema = new Schema({
    clave: {
        type : String, 
        required: [true, 'La clave es necesaria']
    }, 
    nombre : {
        type : String, 
        required : [true, 'El nombre es necesario']
    }, 
    descripcion : {
        type : String
    }, 
    // categoria : {
    //     type : Schema.Types.ObjectId,
    //     ref : 'Categoria',
    //     required : false
    // }, 
    perecedero : {
        type : Boolean,
        default : false
    }, 
    disponible : {
        type : Number
    }
});


module.exports = mongoose.model('Producto', productoSchema);