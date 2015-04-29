'use strict'

// ------------------------------------------
//		Importamos las dependencias
// ------------------------------------------

const st 	= 	require('st') // Invocamos el modulo 'st'
const path 	= 	require('path') // Invocamos el modulo 'path'
const course = 	require('course') // Invocamos modulo 'course'
const jsonBody = require('body/json') // Innvocamos modulo 'body'
const r 	=	require('rethinkdb') // Peticion del modulo 'rethink'
const config = 	require('../model/config.json'); // Peticion de modulo externo de configuracion para conexion con la BD ReQL.



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


// ------------------------------------------------------------------------------
//		Definicion de Funciones para el manejo de los datos en la API-REST
// ------------------------------------------------------------------------------

function listar(req, res) { // Lista en formato JSON la lista de usuarios en la BD ReQL
		r.connect(config.rethinkdb, function(err, conn){ // Realiza la conexion con la BD y devuelve la conn en el callback
			if (err) throw err  // Si la conexion falla devuelve el error 

			r.table('usuarios').run(conn, function(err, cursor) {  // Consulta a la DB (Listar todos los documentos en la tabla 'usuarios')
			    if (err) throw err; // Devuelve err si falla la conn
			    cursor.toArray(function(err, result) {  // Cursor con un array para mostrar los registros
			        if (err) throw err; // Devuelve err si falla la creacion del array en el cursor
			        console.log(JSON.stringify(result, null, 2));  //Debug 
			        res.setHeader("content-type", "application/json")  // Prepara el browser para recibir el formato JSON
	    			res.end(JSON.stringify(result, null, 2)) // Devuelve el resultado a la funcion con los registros listados
			    });
			});
		})
}

function guardar(req, res){  // Funcion para guardar datos en la BD ReQL
	jsonBody(req, res, { limit: 3 * 1024 * 1024 }, function (err, body) {  // Abstraccion del request en formato JSON con el modulo 'body'.
    if (err) return fail(err, res) // Devuelve err con el helper 'fail'
    console.log(body) // Debug

	r.connect(config.rethinkdb, function(err, conn){
		if (err) throw err
		r.table('usuarios').insert({ // Insercion de los datos recojidos en el body en la DB
			usuario:body.usuario,
			pass:body.pass,
			regId:body.regId
		}).run(conn, function(err, result) {
			    if (err) throw err
			    console.log(JSON.stringify(result, null, 2)) // Debug
			})
	})
	res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: true }))
  	})
}

function borrar(req,res){
	r.connect(config.rethinkdb, function(err, conn){
		if (err) throw err

		r.table('usuarios').delete().run(conn, function(err, result){
			if (err) throw err
			console.log(JSON.stringify(result, null, 2))
			res.setHeader('Content-Type','application/json')
			res.end(JSON.stringify({ ok: true }))
		})
	})
}


// ------------------------------------------
//		Funcion para manejor error 500 
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

router.get('/0001', listar)  // Ruta para encontrar el metodo de Listar todos los datos de la BD.
router.put('/0002', guardar) // Ruta para encontrar el metodo de guardar datos en la BD.
router.post('/0003', borrar) // Ruta para encontrar el metodo de borrar datos en la BD.

module.exports = onRequest   //  Exporta la funcion onRequest para ser llamada a nivel global en la aplicacion.

