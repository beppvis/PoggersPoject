
const canvas = document.getElementById("myCanvas");

let startTime ;

document.addEventListener('keydown', function(e) {
    if(e.key === "ArrowRight"){
        document.getElementById("right").focus();
    }
    if(e.key === "ArrowLeft"){
        document.getElementById("left").focus();
    }
    if(e.key === "Tab") {
        e.preventDefault(); 
        

        if(document.activeElement === document.getElementById("left")) {
            document.getElementById("right").focus();
        }
       
        else {
            document.getElementById("left").focus();
        }
    }
});
words = {
    "1": [
        "const",
        "let",
        "var",
        "function",
        "return"
    ],
    "2": [
        "if",
        "else",
        "while",
        "do-while",
        "for"
    ],
    "3": [
        "switch",
        "case",
        "break",
        "continue",
        "throw"
    ],
    "4": [
        "try",
        "catch",
        "finally",
        "throw",
        "instanceof"
    ],
    "5": [
        "class",
        "extends",
        "constructor",
        "super",
        "static"
    ]
};
let wordsByRank = new Array()

for (let level = 1; level <= 5; level++) {
    if (words[level]) {
        wordsByRank.push(words[level]);
    }
}

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
    train.position.y += 1;
}


function drawPlayer() {
    ctx.beginPath();
    ctx.rect(player.postion.x, player.postion.y, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}


function draw(currentWord) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    trains.forEach(drawTrain);
    trains.forEach(collishionCheck);
    checkME(currentWord);
    if (!isGameOver)
        
        requestAnimationFrame(draw);
    else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "30px Arial"
        ctx.fillText("GameOver", 250, 300)
        return
    }
}


function checkME(currentWord) {
    document.getElementById('right').addEventListener('input', function() {
        let inputText = this.value;
        if (inputText.trim() === currentWord) {
            keyHandler({ key: 'd' });
            currentWord = wordGen();
            this.value = '';
        }
    });
    document.getElementById('left').addEventListener('input', function() {
        let inputText = this.value;
        if (inputText.trim() === currentWord) {
            keyHandler({ key: 'a' });
            currentWord = wordGen();
            this.value = '';
        }
    });
}


function wordGen() {
    let currentWord = wordsByRank[2][Math.floor(Math.random() * wordsByRank[2].length)];
    let wordContainer = document.getElementById('wordContainer');
    wordContainer.innerHTML = '';
    currentWord.split('').forEach(letter => {
        let span = document.createElement('span');
        span.textContent = letter;
        span.classList.add('word-char');
        wordContainer.appendChild(span);
    });
    return currentWord;

}


function start() {
    startTime = new Date().getHours();
    isGameOver = false
    trains = new Array();
    let currentWord = wordsByRank[1][Math.floor(Math.random() * wordsByRank[1].length)];
    let wordContainer = document.getElementById('wordContainer');
    wordContainer.innerHTML = '';
    currentWord.split('').forEach(letter => {
        let span = document.createElement('span');
        span.textContent = letter;
        span.classList.add('word-char');
        wordContainer.appendChild(span);
    });
    document.getElementById('right').value = '';
    draw(currentWord);
    setInterval(spawnTrain, 2000);
}
