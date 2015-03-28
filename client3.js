var net = require('net');

var client = net.Socket();
client.connect(3000, function() {
  	console.log('Client3 Connected to Server');
  	// client.write("Hello Server");
  	
  	//readable is an event
  	process.stdin.on('readable', function(){
  		var chunk = process.stdin.read();
  		if (chunk !== null) {
  			client.write('Client3: ' + chunk);
  		}
  	});
  	process.stdin.on('end', function() {
  		client.write('end');
  	});

  	//triggered when there's an event.
	client.on('data', function(data){
	    console.log(data.toString().trim())
	});

	client.on('end', function() {
	    console.log('Client3 disconnected from server');
	});
});