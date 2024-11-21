let music = new Audio("./music/music.mp3");
let turnSound = new Audio("./music/ting.mp3");
let gameover = new Audio("./music/gameover.mp3");

let turn = "X";
let isgameover = false;
let boxDisable = false;
let isDrowGame = true;

//function to change the turn..........
function changeTurn() {
    return turn === "X" ? "0" : "X";
};

// function to check the win........
let checkWin = () => {
    let boxText = document.getElementsByClassName("boxText");
    let win = [
        [0, 1, 2, 3, 4.7, 0],
        [3, 4, 5, 3, 15, 0],
        [6, 7, 8, 3, 25, 0],
        [0, 3, 6, -7.5, 15, 90],
        [1, 4, 7, 2.5, 15, 90],
        [2, 5, 8, 12.6, 15, 90],
        [0, 4, 8, 3, 15, 45],
        [2, 4, 6, 3, 14.5, -45],
    ];
    win.forEach((e) => {
        if ((boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[2]].innerText === boxText[e[1]].innerText) && boxes[e[0]].innerText !== '') {
            document.querySelector(".turn").innerText = boxText[e[0]].innerText + " Won";
            isgameover = true;
            document.querySelector(".boximg").getElementsByTagName("img")[0].style.width = "10vw";
            gameover.play();
            isDrowGame = false;

            document.querySelector(".line").style.width = `25vw`;
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg) `;
            boxDisable = true;

        };
    });
};


//check all boxes are full or not 

let fullBoxCheck =  () =>{
    boxes  = document.querySelectorAll(".boxText");
   
   if(boxes[0].innerText !== "" && boxes[1].innerText !== "" && boxes[2].innerText !== "" && boxes[3].innerText !== "" && boxes[4].innerText !== "" && boxes[5].innerText !== "" && boxes[6].innerText !== "" && boxes[7].innerText !== "" && boxes[8].innerText !== "" ){
    if(isDrowGame){
    document.getElementsByTagName("h2")[0].style.display = "block";
    
    }
   }

}
//game logic...............

let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach((element) => {
    let boxText = element.querySelector(".boxText");


    element.addEventListener("click", (e) => {
        if (boxText.innerText === "") {
            if (!boxDisable) {
                boxText.innerText = turn;
            }
            turn = changeTurn();
            turnSound.play();
            checkWin();
            fullBoxCheck();
            if (!isgameover) {
                document.querySelector(".turn").innerText = "Turn for :" + turn;
            };
          
        };
    });

});


//ading a listiner on reset button ..................

let reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
    let boxText = document.querySelectorAll(".boxText");
    Array.from(boxText).forEach((element) => {
        element.innerText = "";

        //width of dancing image..
        document.querySelector(".boximg").getElementsByTagName("img")[0].style.width = "0";

        //reset the all function
        turn = "X";

        document.querySelector(".line").style.width = `0vw`;
        document.querySelector(".turn").innerText = "Turn for :" + turn;
        isgameover = false;
        boxDisable = false;
        isDrowGame = true;

        if(isDrowGame){
            document.getElementsByTagName("h2")[0].style.display = "none";
            
            };
    });
});
