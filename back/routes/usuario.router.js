'use strict'

let express = require('express');
let multer  = require('multer');
let usuarioController = require('../controllers/usaurio.controller.js');
let api = express.Router();


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.nombre}-${file.originalname}`);
  }
});
let upload = multer({ 
    storage: storage, 
    limits:{ fileSize: (2 * 1024 * 1024) }
}).single('avatar');

function subirAvatar(req, res, next) {
    upload(req, res, (err) => {
        if (err) {
            res.send({
                error: 'El avatar debe ser menor de 2 Mb'
            });
        } else {
            next();
        }
    });
}

api.post('/AddUsuario', subirAvatar, usuarioController.AddUsuario);
api.put('/UpdateUsuario/:idUsuario', usuarioController.VerifToken, usuarioController.UpdateUsuario);
api.get('/GetUsuario/:idUsuario', usuarioController.VerifToken, usuarioController.GetUsuario);
api.get('/GetUsuarios', usuarioController.VerifToken, usuarioController.GetUsuarios);
api.get('/Autentication/:nombre/:pass', usuarioController.Autentication)
api.delete('/DeleteUsuario/:idUsuario', usuarioController.VerifToken, usuarioController.DeleteUsuario);
api.get('/GetAvatar/:avatar', usuarioController.GetAvatar);

module.exports = api;
