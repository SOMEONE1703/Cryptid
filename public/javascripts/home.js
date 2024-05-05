console.log("loaded home successfully");
function custom(){
    window.location.href="/custom-room";
}
function play(){
    sessionStorage.setItem("cryptid-game-action","play");
    window.location.href="/game-mode";
}
