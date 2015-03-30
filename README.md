###Chat App Spec
1. Client type `node client.js` file name to initiate a connection to server.

2. When client is connected, server sends a greeting message and instruction to edit their chatnames and text colors. 

3. Client who's joining in between a conversation will be provided with pervious chat history. 
	
4. To provide a chatname, a client will type 'name' as a command and a preferred chatname, for example: 'name Tom'. 
The method is similar for text color. Type 'color' as a command and follow by color choice, for example: 'color green'.

5. From this point everytime a client type a message into the Terminal, the server should output `Tom: Hello World`, in green. There are other commands listed for clients to use. Everything that a client types will be broadcasted to other clients active in the chat application.

6. When a client leaves the chat application, all clients are notified. If the server is disconnected, all clients are also notified.