let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#Resate_Game");
let container = document.querySelector(".container");
let header = document.querySelector("#header")

let masContainer = document.querySelector(".mas-container");
let PlayGame = document.querySelector("#ply-agn");
let wing = document.querySelector("#wing");

let turn0 = true;

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],

    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],

    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    anableDisable();
    masContainer.classList.add("display");
    container.style.display = "flex";
    resetBtn .style.display = "inline";
    header.style.display = "flex";

}

console.log(boxes)
boxes.forEach((box, index, array) => {

    box.addEventListener("click", () => {
        // console.log(index, "Box was clicked");
        if (turn0 === true) {
            box.innerText = "0";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    });

});

const boxDisable = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const anableDisable = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinning = (winner) => {
    wing.innerText = `Congratulations , Winning is ${winner}`;
    masContainer.classList.remove("display");
    boxDisable();
    container.style.display = "none";
    resetBtn .style.display = "none";
    header.style.display = "none"
}
let checkWinner = () => {
    for (let patten of winpatterns) {
        
        let posi1Val = boxes[patten[0]].innerText;
        let posi2Val = boxes[patten[1]].innerText;
        let posi3Val = boxes[patten[2]].innerText;
        if (posi1Val != "" && posi2Val != "" && posi3Val != "") {
            if (posi1Val === posi2Val && posi2Val === posi3Val) {
                console.log("winning", posi1Val);
                showWinning(posi1Val);
            };
        };
    };
};

PlayGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


















