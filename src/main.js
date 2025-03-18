
const canvas = document.getElementById("myCanvas");

document.addEventListener("keypress", keyHandler, false);

let player = {
    trakNo: 1,
    postion: { x: 50, y: 700 }
}


let isGameOver = false

let track1 = { x: 50 }
let track2 = { x: 250 }
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
    switch (trackNo) {
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




function spawnTrain() {
    let random_track = Math.floor(Math.random() * 3 + 1);
    console.log(random_track)
    let train = {
        trackNo: random_track,
        position: { x: getTrackX(random_track), y: 0 }
    }
    trains.push(train);
}



function collishionCheck(train) {
    if (player.postion.x == train.position.x && player.postion.y == train.position.y)
        isGameOver = true

}

function drawTrain(train) {
    ctx.beginPath();
    ctx.rect(train.position.x, train.position.y, 50, 50);
    ctx.fillStyle = "#A52A2A";
    ctx.fill();
    ctx.closePath();
    train.position.y += 10
}


function drawPlayer() {
    ctx.beginPath();
    ctx.rect(player.postion.x, player.postion.y, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    trains.forEach(drawTrain);
    trains.forEach(collishionCheck);
    if (!isGameOver)
        requestAnimationFrame(draw);
    else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return
    }
}


function start() {
    draw();
    setInterval(spawnTrain, 1000);
}
