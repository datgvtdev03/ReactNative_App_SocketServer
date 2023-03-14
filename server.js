const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var PORT = process.env.PORT || 3000;

io.on("connection", socket => {
  console.log("===Co nguoi vua ket noi", socket.id);

});

server.listen(PORT, () => console.log("Server dang chay cong; "+ PORT));
