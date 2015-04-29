'use strict' // Convención ECMA-Script6 Donde 'const' y 'let' reemplazan a 'var' para evitar problemas de 'Scope'

const http 	= 	require('http') // Peticion del modulo interno HTTP
const router =	require('./router')  // Se invoca el metodo o funcion onRequest que se encuentra modularizado en un archivo con la logica de enrutamiento.
const port 	= 	process.env.PORT || 8081 // Variable de Entorno para definir el puerto donde escucha el servidor


// ------------------------------------------
//		Creacion de un servidor HTTP
// ------------------------------------------

const server = 	http.createServer() // Servidor Arranca y emite eventos "Event- Emmiter"

// -------------------------------------------------
//		Event-Emitter para escuchar en el server
// -------------------------------------------------

	server.on('request',router) // Event = 'request' y Emmit = ejecuta onRequest dentro del modulo "./router"
	server.on('listening', onListen) // Event = 'listening' y Emmit = ejecuta onListen
	server.listen(port) //Metodo para que el servidor inicie la escucha por medio del puerto que se define en el parametro 'port'
	

// ----------------------------------------------------------------------------
//		Funcion Anunciar por consola en que puerto escucha el servidor HTTP
// ----------------------------------------------------------------------------

function onListen(){  // Funcion para escuchar los request HTTP en el puerto 8080 
	console.log(`Servidor activo en el puerto: ${port}`)
}