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
        key1: 'Titulo',
        key2: 'Cuerpo de mensaje'
    },
    dryRun: true
})


// ----------------------------------------------
//		Configurar el sender con el API Key
// ----------------------------------------------

const sender = new gcm.Sender('AIzaSyA6oMC1ml6yA9ZVlu9OCY1_KeTwGuIpUs8')



// --------------------------------------------------------------------------
//		adicionar los regId de los dispositivos a los que se enviara el msg
// --------------------------------------------------------------------------

const registrationIds = []
registrationIds.push('regId1')
registrationIds.push('regId2')


// --------------------------------------------------------------------------
//		Enviar el mensaje con reintentos
// --------------------------------------------------------------------------

sender.send(message, registrationIds, function (err, result) {
  if(err) console.error(err)
  else    console.log(result)
});
