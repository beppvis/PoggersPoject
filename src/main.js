

const canvas = document.getElementById("myCanvas");

document.addEventListener("keypress", keyHandler, false);

let player = {
    trakNo: 1,
    postion: { x: 0, y: 0 }
}


function keyHandler(e) {
    if (e.key === "d" && player.trakNo != 3)
        player.trakNo += 1
    else if (e.key === "a" && player.trakNo != 1)
        player.trakNo -= 1

    switch (player.trakNo) {
        case 1:
            player.postion.x = 800
            player.postion.y = 0
            break;
        case 2:
            player.postion.x = 800
            player.postion.y = 300
            break;
        case 3:
            player.postion.x = 800
            player.postion.y = 400
            break;
        default:
            player.postion.x = 800
            player.postion.y = 300
            break;

    }

}

const ctx = canvas.getContext("2d");




function drawPlayer() {
    ctx.beginPath();
    ctx.rect(player.postion.x, player.postion.y, 10, 10);
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
