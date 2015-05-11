'use strict'

// ------------------------------------------
//		Importamos dependencia 'node-gcm'
// ------------------------------------------

const gcm = require('node-gcm')

// -----------------------------------------------------------------
//		Instanciar objeto del tipo mensaje-gcm con sus propiedades
// -----------------------------------------------------------------

const message = new gcm.Message({
    //collapseKey: 'Ubiquo',
    delayWhileIdle: true,
    timeToLive: 0,
    data: {
        titulo: 'Comunicado!!',
        mensaje: 'Cuerpo del Mensaje con BigText Style'
    }
})

// --------------------------------------------------------------------------
//      adicionar los regId de los dispositivos a los que se enviara el msg
// --------------------------------------------------------------------------

const registrationIds = []
registrationIds.push("APA91bHFx5dKQGoUjji68_h-OhHnoJ7_W-c69Cv36sSsbKj1FPb4o5xdnIuO9S-SIwXhX0jBPwkqCdudbm1iRd0DiAE2iorR04rkQE6g1mvejQ6JXsIFNE790CqbKW-jfhSsqWf78tOG")
registrationIds.push("APA91bFcBz1ArJkDLt0_QwKlH36vukhER0WIoMwKMYh9kwGSGRaRj3_gW621XhGj3hAD013A-hDzbYCC88or63Q4heKNglgSKn9IYGdxjuR_UHqHtftj9jqY90PEq3RXrCDYH4T5qJeI")

// ----------------------------------------------
//		Configurar el sender con el API Key
// ----------------------------------------------

const sender = new gcm.Sender('AIzaSyA6oMC1ml6yA9ZVlu9OCY1_KeTwGuIpUs8')

// --------------------------------------------------------------------------
//		Enviar el mensaje con reintentos
// --------------------------------------------------------------------------

function enviar(req, res){
    sender.sendNoRetry(message, registrationIds, function (err, result) {
        if(err) res.end(err.message)
        else console.log(result) 
            console.log(message)
            res.end(result)

    })
}

module.exports = enviar
