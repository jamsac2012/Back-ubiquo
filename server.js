'use strict' // Convención ECMA-Script6 Donde 'const' y 'let' reemplazan a 'var' para evitar problemas de 'Scope'

const http 	= 	require('http') // Peticion del modulo interno HTTP
const fs 	=	require('fs') // Modulo interno File System para cargar archivos en las rutas
const path 	=	require('path') // Modulo interno para el manejo de las rutas absolutas... contiene un variable __dirname que indica la carpeta actual de la aplicacion y funciona en todos los modulos
const port 	= 	process.env.PORT || 8080 // Variable de Entorno para definir el puerto donde escucha el servidor
const server = 	http.createServer() // Servidor Arranca y emite eventos "Event- Emmiter"

	server.on('request',onRequest) // Event = 'request' y Emmit = ejecuta onRequest
	server.on('listening', onListen) // Event = 'listening' y Emmit = ejecuta onListen
	server.listen(port) //Metodo para que el servidor inicie la escucha por medio del puerto que se define en el parametro 'port'






//FUNCIONES DEFINIDAS 

function onRequest(req, res){
	let fileName = path.join(__dirname,'public','index.html')
	fs.readFile(fileName, function(err , file){
		if (err) {
			return res.end(err.message )
		};
		res.setHeader('Content-type', 'text/html')
		res.end(file)
	} )
}

function onListen(){
	console.log('Servidor activo en el puerto: ' + port)
}