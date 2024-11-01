//select some html elements..................
const grid = document.querySelector(".grid");
let displayScore = document.querySelector("#score");

let socre = 0;

const boardWidth = 560;
const boardHeight = 300;
let timeId;
let ballDirmiter = 20;
let directionX = -2;
let directionY = 2;

//block........
let blockWidth = 100;
let blockHeight = 20;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [250, 30];
let ballCurrentPosition = ballStart;


class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    };
};
//add blocks ..........

let blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
];
//add all function for block........
function addBlock() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.style.left = blocks[i].bottomLeft[0] + "px";
        block.style.bottom = blocks[i].bottomLeft[1] + "px";
        grid.appendChild(block);
    };
};

addBlock();

//user ..................................

const user = document.createElement("div");
user.classList.add("user");
drowUser();
grid.appendChild(user);

//Drow User......
function drowUser() {
    user.style.left = currentPosition[0] + "px";
    user.style.bottom = currentPosition[1] + "px";
};
//user drow ball.........
function drowBall() {
    ball.style.left = ballCurrentPosition[0] + "px";
    ball.style.bottom = ballCurrentPosition[1] + "px";
};

//move..........

function userMove(e) {
    switch (e.key) {
        case "ArrowLeft":
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drowUser();
            };
            break;
        case "ArrowRight":
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10;
                drowUser();
            };
            break;
    };
};

document.addEventListener("keydown", userMove);


//game ball........
const ball = document.createElement("div");
ball.classList.add("ball");
drowBall();
grid.append(ball);

//move ball..........
function moveBall() {
    ballCurrentPosition[0] += directionX;
    ballCurrentPosition[1] += directionY;
    drowBall();
    checkForCollistions();
};

timeId = setInterval(moveBall, 30);

//check for Ball collisions...........

function checkForCollistions() {
    //check for blocks collositions........
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) && ((ballCurrentPosition[1] + ballDirmiter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ){
            const allBlocks = Array.from(document.querySelectorAll(".block"));
            allBlocks[i].classList.remove("block");
            blocks.splice(i, 1);
            changeDirection();
            socre++;
            console.log(socre)
            displayScore.innerText = socre;

            //check for win ..........
            if(blocks.length === 0){
                displayScore.innerText = "You Win Game......";
                clearInterval(timeId);
                document.removeEventListener("keydown" , userMove);
            }
        }
    }

    //check for wall collisitions.......
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDirmiter) ||
        ballCurrentPosition[1] >= (boardHeight - ballDirmiter) ||
        ballCurrentPosition[0] <= 0
    ) {
        changeDirection();
    };

    //check for user collisition...............
    
    if(
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth)&&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ){
        changeDirection();
    }

    //Game over................
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timeId);
        displayScore.innerText = "You lose";
        document.removeEventListener("keydown", userMove);
    }
};

//change ball direction......
function changeDirection() {
    if (directionX === 2 && directionY == 2) {
        directionY = -2;
        return;
    }
    if (directionX === 2 && directionY === -2) {
        directionX = -2;
        return;
    }
    if (directionX === -2 && directionY === -2) {
        directionY = 2;
        return;
    }
    if (directionX === -2 && directionY === 2) {
        directionX = 2;
        return;
    }

};



