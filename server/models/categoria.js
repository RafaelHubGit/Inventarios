var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var categoriaSchema = new Schema ({
    nombre : {
        type: String, 
        required : [true, 'Se requiere el nombre de la categoria']
    }, 
    descripcion : {
        type : String
    },
    estatus : {
        type : Boolean,
        default : true
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);