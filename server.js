var net = require('net');
var fs = require('fs');
// var Cowsay = require('/usr/local/lib/node_modules/cowsay/cli.js');
var chalk = require('chalk');
// var colorChosen = chalk.bold.color[0];
var port = 3000
var clients = [];
var history = [];
// var re = socket.name.replace(/name/i, removed.toString());
// var replaceColor = chalk.replace(/color/i, (colorPick.toString()));
var colorPick = [];
// var clientName = [];
// var count = 0;

var server = net.createServer(function(socket) {
//identify client and add to client list
	socket.name = socket.remotePort + ' ';
	clients.push(socket);
 	console.log(socket.name+ ' connected\n');
 	socket.write("Hello "+socket.name+"\n Please provide chatname by typing name 'chatname'.\n To change your chatname color type color 'yourcolorchoice'\n Here are your other command:\n 'yell', 'yell + string', 'tableflip', 'disapproved', 'sad'.\n You should try playing with them.\n");

//saving names and colors
	// socket.on('data', function(data) {
	// 	var info = data.toString().trim();
	// 	var infoArray = info.split(" ");
	// 	if (infoArray[0] === 'c' && infoArray.length > 1) {
	// 		var pick = infoArray.splice(1,1);
	// 		colorPick.push(pick);
		
	// 		// console.log(pick);
	// 	}
	// 	else if (infoArray[0] === 'name' && infoArray.length > 1) {
	// 		var removed = infoArray.splice(1,1);
	// 		console.log(removed);
	// 	}

		
	// });

//announce to other clients who's just joined
 	broadcast(socket.name+' joined the chat\n', socket);
//showing chat history
 	fs.readFile('chatHistory.txt',function(err,data){
    	if (err){
    		console.log(err);
	    }
	    else{
	    	socket.write("Previous chat history:\n" + data.toString());
	    }
  	});
//saving conversation history
 	socket.on('data', function(data) {      
      	var converse = data.toString().trim();
      	history.push(converse + '\n');
      	fs.writeFile('chatHistory.txt', history, function(err) {
    		if(err) {
    			console.log(err);
    		}
    		else {
    			console.log('saved');
    		}
    	});
    });

//conditions
 	socket.on('data', function(data) {
 		var message = data.toString().trim();
 		var messArray = message.split(" ");

 		if(message === 'yell') {
				broadcast(socket.name + " AHHHH!!!" + '\n',socket);
			}
			else if (message ==='tableflip') {
				broadcast(socket.name + '(╯°□°）╯︵ ┻━┻' + '\n',socket);
			}
			else if (message ==='disapproved') {
				broadcast(socket.name + ' ಠ_ಠ' + '\n',socket);
			}
			else if (message === 'sad') {
				broadcast(socket.name + ' ಥ_ಥ' + '\n',socket);
			}
 			else if (messArray[0] === 'yell' && messArray.length > 1) {
				var shifted = messArray.shift();
 				var messUp = messArray.join(' ').toUpperCase();
		    	broadcast(socket.name + ' ' + messUp + '\n',socket);
			} 
			// else if (messArray[0] === 'color' && messArray.length > 1) {
			// 	var removed = messArray.splice(0,1);
			// 	var pick = messArray.splice(0,1);
			// 	var messy = messArray.toString();
			// 	broadcast(chalk.pick(broadcast(socket.name + ' ' + messy + '\n')));
			// }
			else {
				broadcast(socket.name + message + '\n',socket);
			}
		
	 });

	//remove client from list
	 socket.on('end', function() {
	 	clients.splice(clients.indexOf(socket), 1);
	   broadcast(socket.name +' left the chat.\n');
	 });
// var re = socket.name.replace(/name/i, removed.toString());
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