'use strict'

// ------------------------------------------
//		Importamos dependencia 'node-gcm'
// ------------------------------------------

const gcm = require('node-gcm')

// -----------------------------------------------------------------
//		Instanciar objeto del tipo mensaje-gcm con sus propiedades
// -----------------------------------------------------------------

const message = new gcm.Message({
    collapseKey: 'Ubiquo',
    delayWhileIdle: true,
    timeToLive: 0,
    data: {
        titulo: 'Consultorio Habilitado',
        mensaje: 'Pasar al Pablo tobon a reunión jueves 3:00 Pm con el Doctor Arbelaez.',
        sender: 'Alejandra Caicedo',
        url: 'http://applica.la',
        date: '13 de Jun',
        msgId: '0041',
        msgState: '1'
    }
})

// --------------------------------------------------------------------------
//      adicionar los regId de los dispositivos a los que se enviara el msg
// --------------------------------------------------------------------------

const registrationIds = []
registrationIds.push("APA91bHU7NZ2_chQZWfqNgGlg89fvXfWzq0DtvfwOOgcOnhF5AilyfZ1MV7iY4OanrtOzxQkzLAZqV_Yp16NGKGdMTFB4QjmKZJn7ulwBB63LK5nB-JZKUqK7s7PHWQIY3_jEMTj3RV9")
registrationIds.push("APA91bEfwKqRC-Qm99No0QWpOHFgWyMNBVDq3vx5Sc0BJ70RxjlkMS9UrvjzG0o3JJ7TeBZN4RjGMWrWCW96YG4by2yCTw9SiHMKBkj47O7hmHv54U438XPB8DT7t6BiT5qzAAvWecoU")
registrationIds.push("APA91bFkmmFznruqWEVhJ3w8QthE0YSWWQuWTJ_Ryn9495fmgMD6pNZkPmuEaD_vUVpEMp0VyvwhruHCgIq0RPFSobMGn6YNDKu3ByBZhyZJT7mS92-TtSVNH_bpRLULBnFUS3b9eHH6")


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
