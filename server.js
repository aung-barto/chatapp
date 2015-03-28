var net = require('net');
var port = 3000
var clients = [];
var key = /[yell]/;


var server = net.createServer(function(socket) {
	//identify client and add to client list
	socket.name = socket.remoteAddress + ":" + socket.remotePort;
	clients.push(socket);
 	console.log(socket.name+ ' connected\n');
 	socket.write('Hello '+socket.name+'\n');

 	//announce to other clients who's just joined
 	broadcast(socket.name+' joined the chat\n', socket);

 	socket.on('data', function(data) {
 		var message = data.toString().trim();
 		if (message.match(key) != -1) {
 			var messArray = message.split(" ");
 			var shifted = messArray.shift();
 			var messUp = messArray.toString().toUpperCase();
 			if	(message === 'yell') {
				broadcast(socket.name + " AHHHH!!!" + '\n',socket);
			}
			else if (messArray[1] !== null) {
		    	broadcast(socket.name + ' ' + messUp + '\n',socket);
			} 
		}
	 });

	//remove client from list
	 socket.on('end', function() {
	 	clients.splice(clients.indexOf(socket), 1);
	   broadcast(socket.name +' left the chat.\n');
	 });

	//send message to all client
	function broadcast(message, sender) {
	 	clients.forEach(function (client) {
	 		if (client === sender) return;
	 		client.write(message);
	 	});
	 	process.stdout.write(message);
	}
});

server.listen(port, function() { //'listening' listener
 console.log('listening on port ' + port );
});