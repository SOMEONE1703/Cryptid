var express = require('express');
var router = express.Router();
var path = require('path');
const custom_lobbies = [];
const lobbies = [];
const next_id=0;
const next_custom=0;
function lobby(){
    this.players=[];
    this.player_sockets=[];
    this.lobby_id=-1;;
}
function flobby(){
    this.players=[];
    this.player_sockets=[];
    this.lobby_id=-1;;
}
router.get('/', function(req, res, next) {
  const filePath = path.join(__dirname, "../public/play.html");
  res.sendFile(filePath);
});

module.exports = function(io){
    io.of('/game').on('connection', (socket) => {
        console.log('User connected');
        //socket.emit("new_player");
        socket.emit("identity",{found:"found"});

        socket.on("create",(what)=>{
            let some = new lobby();
            some.players.push(what.username);
            some.player_sockets.push(socket.id);
            some.lobby_id=next_custom;
            next_custom++;
            custom_lobbies.push(some);
            io.to(socket.id).emit("create-res",{id:some.lobby_id});
        });

        socket.on("join",(data)=>{
            const index = custom_lobbies.findIndex(car => car.lobby_id == data.code);
            custom_lobbies[index].player_sockets.push(socket.id);
            custom_lobbies[index].players.push(data.username);
        });

        socket.on("play",(data)=>{
            
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return router;
};
