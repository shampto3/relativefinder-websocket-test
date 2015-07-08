var express = require('express')
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(8000);

// Get the home page
app.get('/', function(req, res){
  res.sendFile('views/index.html', {root: __dirname });
});

io.sockets.on('connection', function(socket){
  socket.on('start', function(data){
    socket.emit('start response', "Starting download for: " + data);
    var percent = 0;
    var interval = setInterval(function(){
      socket.emit('percent', percent);
      if (percent == 100){
        clearInterval(interval);
      }
      percent += 10;
    }, 500);
  });
});
