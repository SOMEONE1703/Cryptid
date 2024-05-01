console.log("starting");
const username=localStorage.getItem("cryptid-username");
const goal=localStorage.getItem("cryptid-goal");

//set the username in players joined
// Establish a connection to the server
const socket = io("/game");
let players=1;

socket.on("identity", (identity) => {
    console.log("Received identity:", identity);
    socket.emit(goal,{username:username});

});

socket.on("create-res",(response)=>{
    console.log(response);
    document.getElementById("join_code").textContent=`Joining code: ${response.id}`;
});

socket.on("new_player",()=>{
    players++;
    if (players>=3){
        //change button colour
    }
});

socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
});

socket.on("error", (error) => {
    console.error("Socket error:", error);
});