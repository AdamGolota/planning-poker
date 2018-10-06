const express = require('express');
const io = require('socket.io')();
const app = express();

const port = 8080;
const socketPort = 8000;

app.listen(port, () => `Server running on port ${port}`);

io.on('connection', () => {
  return 0;
});


io.listen(socketPort);