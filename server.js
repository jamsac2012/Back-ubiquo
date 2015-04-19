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
	let index = path.join(__dirname,'public','index.html')
	let readStream = fs.createReadStream(index)

	res.setHeader('Content-type', 'text/html')
	readStream.pipe(res)

	readStream.on('error', function(err){
		res.setHeader('Content-type', 'text/plain')
		res.end(err.message )
	})

	
}

function onListen(){
	console.log('Servidor activo en el puerto: ' + port)
}