const express = require('express');

const app = express();

app.use( require('./producto') );
app.use( require('./proveedor') );
app.use( require('./categoria') );
app.use( require('./entradaTkt') );
app.use( require('./entradaSalidaProds') );
app.use( require('./pdf') );




module.exports = app;