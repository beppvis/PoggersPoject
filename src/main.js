const { Position } = require("vscode-json-languageservice");


const canvas = document.getElementById("myCanvas");

document.addEventListener("keypress", keyHandler, false);

let player = {
    trakNo: 1,
    postion: { x: 0, y: 700 }
}


let track1 = { x: 50 }
let track2 = { x: 300 }
let track3 = { x: 480 }


let trains = new Array()




function keyHandler(e) {
    if (e.key === "d" && player.trakNo != 3)
        player.trakNo += 1
    else if (e.key === "a" && player.trakNo != 1)
        player.trakNo -= 1

    player.postion.x = getTrackX(player.trakNo)

}


function getTrackX(trackNo) {
    switch (trakNo) {
        case 1:
            return track1.x;
        case 2:
            return track2.x;
        case 3:
            return track3.x;
        default:
            return 0;
    }


}

const ctx = canvas.getContext("2d");


function drawTrains() {
    let random_track = 1;
    trains.push(
        {
            trackNo: random_track,
            position: { x: getTrackX(random_track), y: 0 }
        }
    );



}


function drawPlayer() {
    console.log(player.postion);
    ctx.beginPath();
    ctx.rect(player.postion.x, player.postion.y, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    requestAnimationFrame(draw);
}


function start() {
    draw();
}
