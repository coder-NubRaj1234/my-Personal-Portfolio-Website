
import { musciPlay, soundPlay } from "./sound.js";
import { foodSound, gameOverSound, moveSound, musicSound , check} from "./sound.js";

let gameBord = document.querySelector("#game-board");
let currentSpeedElm = document.querySelector("#current-score");
let slecter = document.querySelector("#selectr");
let hiscoreElm = document.querySelector("#height-score");

let snakeElement;
let food;

let checkSelfCollide = true;
let gameSpeed = 8;
let lastTime = 0;

let Score = 0;
let hiScore = 0;
let checkLebale = 1;

let hiScoreArray = [
    { slow: 0 }, { medium: 0 }, { heigh: 0 }
];

// set dafult  snake position.............
let snakeArry = [
    { x: 10, y: 10 },
];
//input and food direction.........
let inputDir = { x: 0, y: 0 };
let foodDir = { x: 0, y: 0, };

//set height score ..................
function hiScoreCall() {
    let scoreArry = localStorage.getItem("snake")? JSON.parse(localStorage.getItem("snake")) : [];
    scoreArry.forEach(function (item, index) {
        if (checkLebale == index) {
            for (let key in item) {
                hiscoreElm.innerText = `Hi Score : ${item[key]} 🏆`;
                hiScore = item[key];
            };
        };
    });
};
hiScoreCall();
//to clear default behaviour............
slecter.addEventListener("keydown", function (e) {
    e.preventDefault();
});
//current score...............
function currentScore() {
    currentSpeedElm.textContent = `Score : ${Score} 🍎`;
};
//event for dropdown..................
document.addEventListener("click", function (e) {
    if (e.target.dataset.speed) {
        gameSpeed = e.target.dataset.speed;
        checkLebale = e.target.value;
        hiScoreCall();
    };
});

//set food random position............
function foodRandomLoc() {
    foodDir.x = (Math.floor(Math.random() * 19) + 1);
    foodDir.y = (Math.floor(Math.random() * 19) + 1);
};
foodRandomLoc();

function gamingTimimgFun(ctime) {
    window.requestAnimationFrame(gamingTimimgFun);

    if ((ctime - lastTime) / 1000 > (1 / gameSpeed)) {
       if(check){
        gameEngine();
        lastTime = ctime;
       };
    };
};
function gameEngine() {
 
    //if you collide width yourself....................
    snakeArry.forEach(function (item, index) {
   if(checkSelfCollide){
  if(index !== undefined){
    if ((snakeArry[index].x === snakeArry[0].x && snakeArry[index].y === snakeArry[0].y) && (index !== 0)) {
        inputDir = { x: 0, y: 0 };
        musicSound.pause();
        musicSound.currentTime = 0;
        gameover("Collided with yourSelf");
        snakeArry = [
            { x: 10, y: 10 },
        ];
    };
  };
};
});

checkSelfCollide = true;
       //if sanke collide width wall.......
       if (snakeArry[0].x > 20 || snakeArry[0].x <= 0 || snakeArry[0].y <= 0 || snakeArry[0].y > 20) {
        inputDir = { x: 0, y: 0 };
        checkSelfCollide = false;
        musicSound.pause();
        musicSound.currentTime = 0;
        gameover("coddided with wall");
        snakeArry = [
            { x: 10, y: 10 },
        ];
    };
    //if sanke eat food generate new food and add new snake in snakeArry.........
    if (snakeArry[0].x === foodDir.x && snakeArry[0].y === foodDir.y) {
        Score++;
        currentScore();
        foodRandomLoc();
        setTimeout(function () {
            snakeArry.unshift({ x: snakeArry[0].x + inputDir.x, y: snakeArry[0].y + inputDir.y });
        }, 200);
        food.style.gridColumnStart = foodDir.x;
        food.style.gridRowStart = foodDir.y;
        if (soundPlay) {
            foodSound.play();
        };

        //check score and hiscore...............
        if (hiScore < Score) {
            hiScore = Score;
            hiScoreArray =  localStorage.getItem("snake") ? JSON.parse(localStorage.getItem("snake")) : [{ slow: 0 }, { medium: 0 }, { heigh: 0 }];
            console.log(hiScoreArray)
            hiScoreArray.forEach(function (item, index) {
                if (checkLebale == index) {
                    for (let key in item) {
                        item[key] = hiScore;
                    };
                };
            });
            localStorage.setItem("snake", JSON.stringify(hiScoreArray));
            hiScoreCall();
        };
    };
    //move the snake.............
    for (let i = snakeArry.length - 2; i >= 0; i--) {
        snakeArry[i + 1] = { ...snakeArry[i] };
    };

    snakeArry[0].x += inputDir.x;
    snakeArry[0].y += inputDir.y;

    gameBord.innerHTML = '';
    snakeArry.forEach(function (e, index) {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add("snake-head");
        } else {
            snakeElement.classList.add("snake-body");
        };
        gameBord.appendChild(snakeElement);
    });

    gentareFood();
    checkFoodLoc();
};
//cheack the food locatiion and snake items losction is mathch ..................
function checkFoodLoc() {
    snakeArry.forEach(function (items, index) {
        if (items.x === foodDir.x && items.y === foodDir.y && index !== 0) {
            foodRandomLoc();
            checkFoodLoc();
        };
    });
};
checkFoodLoc();
//gaem over functions.............
function gameover(message) {
    inputDir = { x: 0, y: 0 };
    Score = 0;
    currentScore();
    if (soundPlay) {
        gameOverSound.play();
    };
    alert(message);
    gameBord.innerHTML = '';
    snakeElement.style.gridColumnStart = snakeArry[0].x;
    snakeElement.style.gridRowStart = snakeArry[0].y;
    foodRandomLoc();
    gentareFood();
};

//genarata food....
function gentareFood() {
    food = document.createElement("div");
    food.classList.add("snake-food");
    food.style.gridRowStart = foodDir.y;
    food.style.gridColumnStart = foodDir.x;
    gameBord.appendChild(food);
};
gentareFood();


window.requestAnimationFrame(gamingTimimgFun);
window.addEventListener("keyup", snakeMove);

//for mobile snake game some code.........

const mobileGameCol = document.querySelector("#game-controlor");

mobileGameCol.addEventListener("click", function(e) {
    if(e.target.classList.contains("fa-solid")){
        if (musciPlay) {
            musicSound.play();
        };
        if (soundPlay) {
            moveSound.play();
        };
    }
    if(e.target.classList.contains("fa-caret-up")){
        if (inputDir.y !== 1) {
            inputDir.x = 0;
            inputDir.y = -1;
        }
    } else if(e.target.classList.contains("fa-caret-down")){
        if (inputDir.y !== -1) {
            inputDir.x = 0;
            inputDir.y = 1;
        };
    } else if(e.target.classList.contains("fa-caret-left")){
        if (inputDir.x !== 1) {
            inputDir.x = -1;
            inputDir.y = 0;
        };
    } else if(e.target.classList.contains("fa-caret-right")){
        if (inputDir.x !== -1) {
            inputDir.x = 1;
            inputDir.y = 0;
        };
    };
});

function snakeMove(e) {
    let key = e.key;
    if (musciPlay) {
        musicSound.play();
    };
    if (soundPlay) {
        moveSound.play();
    };
    switch (key) {
        case ("ArrowUp"):
            if (inputDir.y !== 1) {
                inputDir.x = 0;
                inputDir.y = -1;
            }
            break;

        case ("ArrowDown"):
            if (inputDir.y !== -1) {
                inputDir.x = 0;
                inputDir.y = 1;
            };
            break;
        case ("ArrowRight"):
            if (inputDir.x !== -1) {
                inputDir.x = 1;
                inputDir.y = 0;
            };
            break;

        case ("ArrowLeft"):
            if (inputDir.x !== 1) {
                inputDir.x = -1;
                inputDir.y = 0;
            };
            break;
    };

};

