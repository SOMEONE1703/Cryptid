var express = require('express');
var router = express.Router();
var path = require('path');

const next_id=0;
function lobby(){
    this.players=[];
    this.player_sockets=[];
    this.lobby_id=0;
}

router.get('/', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/play.html");
  res.sendFile(filePath);
});

module.exports = function(io){
    io.of('/game').on('connection', (socket) => {
        console.log('User connected');
        socket.emit("identity",{found:"found"});
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return router;
};
