
const express = require("express");
const expressServer = express();

// This Line Below Serevr static files to server.
expressServer.use(express.static('public'));

// Modifying express server to my http server since we need socket io server .




const socketIO = require("socket.io");
const http = require("http");
const serverClass = socketIO.Server;
const httpServer = http.createServer(expressServer)
httpServer.listen(8888);
// socketIOCompatibleServer is modified Server with io properties too
const io = new serverClass(httpServer);


// server.get("/",function handleRequest(req,res){
//     res.send("Hello Wilcome To Server Bitch");
// })
io.on('connection',(socket)=>{
    socket.on('secretMessage',data=>{
        io.emit('ioSecretMessage',data);
    })
})

