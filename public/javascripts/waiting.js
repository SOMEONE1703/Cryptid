console.log("starting");
//const username=localStorage.getItem("cryptid-username");
// const goal=localStorage.getItem("cryptid-goal");
// const code=localStorage.getItem("cryptid-code");
// const mode=localStorage.getItem("cryptid-mode");
const username="temporary";
const goal="play";
const code=0;
const mode = "intro";

//set the username in players joined
// Establish a connection to the server
const socket = io();
let players=1;

socket.on("identity", (identity) => {
    console.log("Received identity:", identity);
    
    if (goal=="create"){
        socket.emit("create",{username:username,mode:mode});
    }
    else if(goal=="join"){
        socket.emit("join",{username:username,code:code});
    }
    else if(goal=="play"){
        socket.emit("play",{username:username,mode:mode});
    }
});

socket.on("create-res",(response)=>{
    console.log(response);
    document.getElementById("join_code").textContent=`Joining code: ${response.id}`;
});


socket.on("start-game",()=>{
    console.log("Let the games begin");
});

socket.on("newplayer",(data)=>{
    players++;
    console.log("new new player");
    console.log(data);
    let temp = document.getElementById("players");
    let p=document.createElement("p");
    p.textContent="what";
    temp.appendChild(p);
    console.log("appended");
});

socket.on("found",(data)=>{
    console.log("found match");
    console.log(data);
    //display the array of players
});

socket.on("not-found",()=>{
    //invalid code, alert player
});


socket.on("play-res",(data)=>{
    //something
});

socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
});

socket.on("error", (error) => {
    console.error("Socket error:", error);
});
//socket.emit("play",{username:username,mode:mode});