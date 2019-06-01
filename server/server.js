require('./config/config');

const express = require('express');

const mongoose = require('mongoose');

const path = require('path');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const publicPath = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));

//Configuracion global de rutas
app.use( require('./routes/index') );



// app.listen(port, (err) => {

//     if (err) throw new Error(err);

//     console.log(`Servidor corriendo en puerto ${ port }`);

// });

mongoose.connect(process.env.URLDB, //Se trae del arch config
    {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false}, //Es  una actualizacion de Mongo Atlas
    (err, res) => {

if( err ) throw err;

console.log("Base de datos ONLINE");

});


app.listen(process.env.PORT, () => {
console.log(`Escuchando puerto: ${process.env.PORT} `);
});