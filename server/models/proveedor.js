var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var proveedorSchema = new Schema ({
    nombre : {
        type: String, 
        required : [true, 'Se requiere el nombre del proveedor']
    }, 
    estatus : {
        type : Boolean,
        default : true
    }
});

module.exports = mongoose.model('Proveedor', proveedorSchema);