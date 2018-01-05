const http = require('http');
const express = require('express');
const app = express();
const io = require('socket.io')
const server = http.createServer(app);

app.set('port', 3000);

app.use(express.static(__dirname + '/public'));

server.listen(app.get('port'), function() {
	console.log('Server started in port 3000');
});

var sockets = io.listen(server);

sockets.on('connection', function(socket) {
	console.log('Nuevo cliente conectado');

	socket.on('client-message', function(data) {
		sockets.emit('client-message', data);
	});
});