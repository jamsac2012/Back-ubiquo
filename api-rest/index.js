'use estrict'

const jsonBody = require('body/json') // Innvocamos modulo 'body'
const r 	=	require('rethinkdb') // Peticion del modulo 'rethink'
const config = 	require('../model/config.json'); // Peticion de modulo externo de configuracion para conexion con la BD ReQL.

// ------------------------------------------------------------------------------
//		Definicion de Funciones para el manejo de los datos en la API-REST
// ------------------------------------------------------------------------------

exports.listar = function(req, res) { // Lista en formato JSON la lista de usuarios en la BD ReQL
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

exports.guardar = function(req, res){  // Funcion para guardar datos en la BD ReQL
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

exports.login = function(req, res){  // Funcion para buscar usuario y pass en la BD ReQL
	jsonBody(req, res, { limit: 3 * 1024 * 1024 }, function (err, body) {  // Abstraccion del request en formato JSON con el modulo 'body'.
    if (err) return fail(err, res) // Devuelve err con el helper 'fail'
    console.log(body) // Debug

	r.connect(config.rethinkdb, function(err, conn){
		if (err) throw err
		r.table('usuarios').filter(r.row("usuario").eq(body.usuario).and(r.row("pass").eq(body.pass))).run(conn, function(err, result) {
			    if (err) throw err
			    console.log(JSON.stringify(result, null, 2)) // Debug
			})
	})
	res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: true }))
  	})
}

exports.borrar = function(req,res){
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
//		Helper para manejar error 500 
// ------------------------------------------


function fail (err, res){  // Funcion para definir o encausar un error cuando no sabemos que paso
	res.statusCode = 500 	// Asigna un codigo de respuesta al error
	res.setHeader('Content-Type', 'text/plain')  // Prepara el browser para recibir un texto plano
	res.end(err.message)  //  Sirve el error en el browser.
}

