const http = require("http");
const express = require("express");
const {Server} = require("socket.io");

// import {createServer} from "http";
// import {Server} from "socket.io";
// import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        optionsSuccessStatus:200,
        methods:["GET","POST"],
        transports:['websocket','polling'],
    }, // setup CORS
    allowEIO3:true,
    connectionStateRecovery:{}, // setup for connection state recovery in case of disconnect
})

io.on('connection', socket => {
    console.log('New client connected');

    // join chat room
    socket.join('chatRoom');

    socket.on('message_sent', (data) => {
        console.log(data);
        // io.emit('new_message_for_you', data);
    //     broadcast instead
        io.to('chatRoom').emit('new_message_for_you',data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    });
});

const PORT = 9078;
// const PORT = 80;
// const HOSTNAME = "";

server.listen(PORT,() => {
    console.log("Listening on port *:9078");
})

// server.listen(PORT,HOSTNAME,()=>{
//     // DO SOMETHING
// })
