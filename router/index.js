'use strict'

// ------------------------------------------
//		Importamos las dependencias
// ------------------------------------------

const st 	= 	require('st') // Invocamos el modulo 'st'
const path 	= 	require('path') // Invocamos el modulo 'path'
const course = 	require('course') // Invocamos modulo 'course'
const gcmSend = require('../gcm') // Invocamos modulo 'node-gcm' con la funcionalidad para enviar el mensaje a GCM
const api =		require('../api-rest') //Invocamos las funciones para los metodos de la API.


// --------------------------------------------------------------------------------------------
//		Montaje de la ruta estatica para encontrar todos los archivos de la carpeta ./public
// --------------------------------------------------------------------------------------------

const mount = st({  // Constante que me carga la funcionalidad de st que requiere dos propiedades
	path: path.join( __dirname, '..', 'public'), // metodo .join para armar la ruta estatica en la carpeta public y todos sus archivos
	index: 'index.html',  // Me pregunta cual sera el archivo para indexar por defecto. En este caso abrirá index.html
	passthrough : true  // Para que siga adelante en la logica si no encontramos la ruta estatica
})


// ----------------------------------------------------------------------------------------
//		Funcion que será exportada - Responde inicialmente a la ruta estatica 'mount',  
//		de no localizar el req, buscara en el router, por ultimo enviara un error 404.
// ----------------------------------------------------------------------------------------

function onRequest(req, res){ 
	mount(req,res, function(err){  // Llamo al montaje de la ruta statica para saber si esta disponible en la respuesta y adhiero un callback por si es un error
		if (err) return fail(err, res) // En caso de error no definido active la funcion fail y lleve el error y respondame cual error fue.

		router(req, res, function(err){  // Se activa luego de no encontrar el req en la ruta statica y continua el procedmienito si es error.
			if (err) return fail(err, res) // En caso de error no definido active la funcion fail y lleve el error y respondame cual error fue.

			res.statusCode = 404  // Si no es un error loco o indefinido entonces defina un 404
			res.end(`404 Not found ${req.url}`)  // Imprima en pantalla 	
		})
		
	})	
}


// ------------------------------------------
//		Helper para manejar error 500 
// ------------------------------------------


function fail (err, res){  // Funcion para definir o encausar un error cuando no sabemos que paso
	res.statusCode = 500 	// Asigna un codigo de respuesta al error
	res.setHeader('Content-Type', 'text/plain')  // Prepara el browser para recibir un texto plano
	res.end(err.message)  //  Sirve el error en el browser.
}



// ------------------------------------------
//		Manejo de Rutas para la API
// ------------------------------------------

const router = course()

router.get('/0001', api.listar)  // Ruta para encontrar el metodo de Listar todos los datos de la BD.
router.post('/0002', api.guardar) // Ruta para encontrar el metodo de guardar datos en la BD.
router.get('/0003', api.borrar) // Ruta para encontrar el metodo de borrar datos en la BD.
router.get('/0004', gcmSend) // Ruta para enviar mensajes a GCM de Google.
router.post('/0005', api.login) // Ruta para verificar la existencia de un login

module.exports = onRequest   //  Exporta la funcion onRequest para ser llamada a nivel global en la aplicacion.

