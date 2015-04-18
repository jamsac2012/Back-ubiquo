'use strict'

const http = require('http')
const port= process.env.PORT || 8080

const server = http.createServer() // Servidor Arranca y emite eventos "Event- Emmiter"

server.on('request',onRequest) // Event = 'request' y Emmit = ejecuta onRequest
server.on('listening', onListen) // Event = 'listening' y Emmit = ejecuta onListen

server.listen(port)

//FUNCIONES 

function onRequest(req, res){
	res.end('Hola Ubiquo')
}

function onListen(){
	console.log('Servidor activo en el puerto: ' + port)
}