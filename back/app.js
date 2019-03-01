'use strict'
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
const apiUsuario = require("./routes/usuario.router.js");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

app.use('/api/usuario', apiUsuario);

module.exports = app;
