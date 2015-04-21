const st = require('st') // Invocamos el modulo 'st'
const path = require('path') // Invocamos el modulo 'path'
const course = require ('course') //Invocamos modulo 'course'

const router = course()
const mount = st({  // Constante que me carga la funcionalidad de st que requiere dos propiedades
	path: path.join( __dirname, '..', 'public'), // metodo .join para armar la ruta estatica en la carpeta public y todos sus archivos
	index: 'index.html',  // Me pregunta cual sera el archivo para indexar por defecto. En este caso abrirá index.html
	passthrough : true  // Para que siga adelante en la logica si no encontramos la ruta estatica
})


// RUTAS DEFINIDAS SEGUN EL METODO

router.post('/guardar', function(req, res){ // Ruta para guardar los RegisterId de los dispositivos

})

router.get('/validar', function(req, res){ // Ruta para validar que las credenciales existen en Ubiquo.

})


//FUNCIONES DE RESPUESTA

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

function fail (err, res){  // Funcion para definir o encausar un error cuando no sabemos que paso
	res.statusCode = 500 	// Asigna un codigo de respuesta al error
	res.setHeader('Content-Type', 'text/plain')  // Prepara el browser para recibir un texto plano
	res.end(err.message)  //  Sirve el error en el browser.
}

module.exports = onRequest   //  Exporta la funcion onRequest para ser llamada a nivel global en la aplicacion.