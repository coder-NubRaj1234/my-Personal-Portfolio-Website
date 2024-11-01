let userScore = 0;
let comScore = 0;

const choises = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userChoisePara = document.querySelector("#you-score");
const comChoisePara = document.querySelector("#com-score");


const drowGame = () => {
    console.log("Game Was drow !!");
    msg.innerText = "Game  was Drow ! Play Again";
    msg.style.backgroundColor = "#081b31";
}
const genComChoise = () => {
    const comChoise = ["rock", "paper", "scissors"];
    const ranIdx = Math.floor(Math.random() * 3);
    return comChoise[ranIdx];
};

let showWin = (userWin, userChoise, computerChoise) => {
    if (userWin) {
        userScore++;
        msg.innerText = `You Win ! Your ${userChoise} beats ${computerChoise}`;
        msg.style.backgroundColor = "green";
        userChoisePara.innerText = userScore;
    } else {
        comScore++;
        msg.innerText = `You Lose ! Comp ${computerChoise} beats your ${userChoise}`;
        msg.style.backgroundColor = "red";
        comChoisePara.innerText = comScore;
    };
};

const playGame = (userChoise) => {
    console.log("User Choise = ", userChoise);

    // computer Choise 
    const computerChoise = genComChoise();
    console.log("Com Choise = ", computerChoise);

    if (userChoise === computerChoise) {
        drowGame();
    } else {
        let userWin = true;
        if (userChoise === "rock") {
            userWin = computerChoise === "paper" ? false : true;
        } else if (userChoise === "paper") {
            userWin = computerChoise === "scissors" ? false : true;
        } else if (userChoise === "scissors") {
            userWin = computerChoise === "rock" ? false : true;
        }
        showWin(userWin, userChoise, computerChoise);
    };
};

choises.forEach((choise) => {
    choise.addEventListener("click", () => {
        const userChoise = choise.getAttribute("id");
        playGame(userChoise);

    });
});












