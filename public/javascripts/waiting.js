console.log("starting");

// Establish a connection to the server
const socket = io("/game");

socket.on("identity", (identity) => {
    console.log("Received identity:", identity);
});


socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
});

socket.on("error", (error) => {
    console.error("Socket error:", error);
});