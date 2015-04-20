const st = require('st')
const path = require('path')

const mount = st({
	path: path.join( __dirname, '..', 'public'),
	index: 'index.html'
})

function onRequest(req, res){
	mount(req,res, function(){
		if (err) return res.end(err.message)

		res.statusCode = 404
		res.end(`This ${req.url} Not found... Opps `)
	})	
}

module.exports = onRequest