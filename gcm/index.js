'use strict'

// ------------------------------------------
//		Importamos dependencia 'node-gcm'
// ------------------------------------------

const gcm = require('node-gcm')

// -----------------------------------------------------------------
//		Instanciar objeto del tipo mensaje-gcm con sus propiedades
// -----------------------------------------------------------------

const message = new gcm.Message({
    collapseKey: 'demo',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
        titulo: 'Funciona!!!!!',
        mensaje: 'Mi primera notificacion Push'
    }
})

// --------------------------------------------------------------------------
//      adicionar los regId de los dispositivos a los que se enviara el msg
// --------------------------------------------------------------------------

const registrationIds = []
registrationIds.push('regId1')
registrationIds.push('regId2')

// ----------------------------------------------
//		Configurar el sender con el API Key
// ----------------------------------------------

const sender = new gcm.Sender('AIzaSyA6oMC1ml6yA9ZVlu9OCY1_KeTwGuIpUs8')

// --------------------------------------------------------------------------
//		Enviar el mensaje con reintentos
// --------------------------------------------------------------------------

function enviar(req, res){
    sender.send(message, registrationIds, 4, function (err, result) {
        if(err) res.end(err.message)
        else console.log(result) 
            console.log(message)
            res.end(result)

    })
}

module.exports = enviar
