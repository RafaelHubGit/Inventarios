const express = require('express');

const app = express();

app.use( require('./producto') );




module.exports = app;