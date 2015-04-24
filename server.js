'use strict' // Convención ECMA-Script6 Donde 'const' y 'let' reemplazan a 'var' para evitar problemas de 'Scope'

const r 	=	require('rethinkdb') // Peticion del modulo 'rethink'
const config = 	require('./model/config.json'); // Peticion de modulo externo de configuracion para conexion con la BD ReQL.
const http 	= 	require('http') // Peticion del modulo interno HTTP
const fs 	=	require('fs') // Modulo interno File System para cargar archivos en las rutas
const path 	=	require('path') // Modulo interno para el manejo de las rutas absolutas... contiene un variable __dirname que indica la carpeta actual de la aplicacion y funciona en todos los modulos
const router =	require('./router')  // Se invoca el metodo o funcion onRequest que se encuentra modularizado en un archivo con la logica de enrutamiento.
const port 	= 	process.env.PORT || 8081 // Variable de Entorno para definir el puerto donde escucha el servidor
const server = 	http.createServer() // Servidor Arranca y emite eventos "Event- Emmiter"

// CREACION DE SERVIDOR HTTP

	server.on('request',router) // Event = 'request' y Emmit = ejecuta onRequest dentro del modulo "./router"
	server.on('listening', onListen) // Event = 'listening' y Emmit = ejecuta onListen
	server.listen(port) //Metodo para que el servidor inicie la escucha por medio del puerto que se define en el parametro 'port'

// CONEXION CON LA BD

	r.connect(config.rethinkdb)
		.then(function(conn) {
		    console.log(conn)
		    console.log('Conexion Establecida')
			})
		.error(function(error){
		    console.log(error.message);
			});


//FUNCIONES DEFINIDAS 

function onListen(){  // Funcion para escuchar los request HTTP en el puerto 8080 
	console.log(`Servidor activo en el puerto: ${port}`)
}