'use strict'
let path = require('path');
const sha512 = require('js-sha512').sha512;

const config = require('../dbConfig.js');
const knex = require('knex');

const conn = knex({
	client: config.client,
	connection: {
		host: config.host,
		user: config.user,
		password: config.pass,
		database: config.base
	}	
});



/*====================================================
=            Funcion para agregar usuario            =
====================================================*/

function AddUsuario(req, res){
	let avatar = "";

	if (req.file) {
	    // console.dir(req.file);
	    avatar = req.file.filename;
	}

	const usuario = {
        nombre: req.body.nombre,
        edad: req.body.edad,
        avatar: avatar,
        email: req.body.email,
        pass: sha512(req.body.pass),
        rol: req.body.rol
    };
	conn('Usuario').insert(usuario).then(result => {
		res.status(200).json({
			// succes: true, 
			resp: "Usuario guardado correctamente",
			data: result[0],
			file: req.file

		});
	}).catch(error => {
		res.status(500).send({
            resp: 'error',
            error: `${error}`,
            req: req.body
        });
	});
	
}

/*=====  End of Funcion para agregar usuario  ======*/


/*=========================================
=            Update de usuario            =
=========================================*/

function UpdateUsuario(req, res){
    if(1) {
        const idUsuario = req.params.idUsuario;
        const usuario = {
            nombre: req.body.nombre,
            edad: req.body.edad,
            email: req.body.email,
            pass: sha512(req.body.pass),
            rol: req.body.rol
        };
        conn('Usuario').where('idUsuario', idUsuario).update(usuario).then(result => {
            if (result != 0) {
                res.status(200).send({
                    succes: true,
                    resp: "Usuario actualizado correctamente",
                    data: result
                });
            }
            else{
                res.status(500).send({
                    succes: false,
                    resp: "No se actualizó ningun usuario"
                });
            }
        }).catch(error => {
            res.status(500).send({
                succes: false,
                resp: "Error al actualizar el usuario",
                error: `${error}`,
                user: user,
                params: req.body
            });
        });
    } else {
        res.status(500).send({
            succes: false,
            resp: "No tiene permisos para actualizar el usaurio"
        });
    }
}

/*=====  End of Update de usuario  ======*/


/*==========================================================
=            Obtenemos un usuario en específico            =
==========================================================*/

function GetUsuario(req, res){
	let idUsuario = req.params.idUsuario;

	conn('Usuario').where('idUsuario', idUsuario).select('nombre', 'edad', 'avatar', 'email', 'rol').then(usuario => {
		if(!usuario[0]){
			res.status(200).send({
				resp:"faild", 
				error: "Usuario no encontrado"
			});
		}
		else{
			res.status(200).send({
				resp: usuario[0]
			});
		}
	}).catch(error => {
		res.status(500).send({resp: 'error', error: `${error}` });
	});

}

/*=====  End of Obtenemos un usuario en específico  ======*/


/*====================================================
=            Obtenemos todos los usuarios            =
====================================================*/

function GetUsuarios(req, res){

	conn('Usuario').select('idUsuario', 'nombre', 'edad', 'avatar', 'email', 'rol').then(usuarios => {
		if(!usuarios){
			res.status(200).send({
				resp:"faild", 
				error: "Usuario no encontrado"
			});
		}
		else{
			res.status(200).send({
				resp: usuarios
			});
		}
	}).catch(error => {
		res.status(500).send({resp: 'error', error: `${error}` });
	});

}

/*=====  End of Obtenemos todos los usuarios  ======*/



/*==================================================
=            Elimincación de un usuario            =
==================================================*/

function DeleteUsuario(req, res){
	let idUsuario = req.params.idUsuario;

	conn('Usuario').where('idUsuario', idUsuario).del().then( result => {
		if(result == 1)
			res.status(200).send({
                resp: "Usuario eliminado"
            });
		else
			res.status(200).send({resp: 'error al eliminar el usuario'});
	}).catch(error => {
		res.status(500).send({resp: 'error', error: `${error}` });
	});
}

/*=====  End of Elimincación de un usuario  ======*/


/*========================================================
=            obtención de la foto del usuario            =
========================================================*/

function GetAvatar(req, res){
	let avatar = req.params.avatar;
	res.sendFile(path.resolve(`./Uploads/${avatar}`));
}

/*=====  End of obtención de la foto del usuario  ======*/


/*==============================
=            logueo            =
==============================*/

function Autentication(req, res){
	conn('Usuario').where({
        nombre: req.params.nombre,
        pass: sha512(req.params.pass)
    }).select('nombre', 'edad', 'avatar', 'email', 'rol').then(usuario => {
		if(!usuario[0]){
			res.status(200).send({
                succes: false,
				resp:"Usuario o contraseña incorrecta"
			});
		}
		else{
			res.status(200).send({
                succes: true,
				resp: usuario[0]
			});
		}
	}).catch(error => {
		res.status(500).send({resp: 'error', error: `${error}` });
	});
}

/*=====  End of logue  ======*/


/*==================================================
=            Exportación de los métodos            =
==================================================*/

module.exports = {
	AddUsuario,
	UpdateUsuario,
	DeleteUsuario,
	GetUsuario,
	GetAvatar,
    Autentication,
    GetUsuarios
}

/*=====  End of Exportación de los métodos  ======*/
