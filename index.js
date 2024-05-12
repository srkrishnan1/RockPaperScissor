const gameControls = document.querySelectorAll(".gameControls");
const userControls = document.querySelectorAll(".userControls");
const choicesDiv = document.querySelector(".choicesDiv");
const countDownDiv = document.querySelector(".countDownDiv");
const countDownPara = countDownDiv.querySelector(".countDown");
const countDown = countDownDiv.querySelector(".countDown").textContent;
const computerControls = document.querySelectorAll(".computerControls");
const error_message = document.querySelector(".error-message");
const currentRoundDispaly = document.getElementById("currentRound");
const finalDiv = document.querySelector(".finalDiv");
const playAgainBtn = document.getElementById("playAgain");
const userScorePara = document.querySelector(".userScore");
const computreScorePara = document.querySelector(".computreScore");
const statusOfWin = document.getElementById("statusOfWin");
const computerFireWork = document.getElementById("computerFireWork");
const userFireWork = document.getElementById("userFireWork");
const nextRoundBtn = document.getElementById("nextRoundPlay");
var userScore = 0;
var Delay = 0;
var computerScore = 0;
var currentRound = 1;
let gameRemaining = 0;
var selectedBtn;
var computerChoice;
var roundTime = 0;
var countRemaining = 0;
var gameEnableKey = false;

keyboardControls();


function checkCondition() {
  roundTime = Number(document.querySelector("select").value);
  if (!roundTime == 0) {
    startGame(roundTime);
  } else {
    removeClass([error_message], ["hidden"]);
    error_message.textContent = "Please Choose Round";
  }
}

function startGame() {
  countDownPara.textContent = "3";
  addClass([countDownPara], ["animate-[bounce_1s_ease-in-out_infinite]"]);
  count = 4;
  removeClass([countDownDiv], ["hidden"]);
  addClass([choicesDiv], ["hidden"]);
  countDownTimer(countDown);
}

function init() {
  enableBtn(userControls);
  gameEnableKey = true;
  addClass(userControls, ["hover:border-blue-400", "hover:shadow-sm"]);
}

function addClass(element, className, delay) {
  element.forEach((element) => {
    className.forEach((Name) => {
      element.classList.add(Name);
    });
  });
}

function removeClass(element, className, delay) {
  element.forEach((element) => {
    className.forEach((Name) => {
      element.classList.remove(Name);
    });
  });
}

function enableBtn(element) {
  element.forEach((e) => {
    e.disabled = false;
  });
}
function disableBtn(element) {
  element.forEach((e) => {
    e.disabled = true;
  });
}

function btnSelected(id) {
  selectedBtn = document.getElementById(id);
  addClass([selectedBtn], ["bg-gray-100", "border-blue-100"]);
  disableBtn(userControls);
  gameEnableKey = false;
  removeClass(userControls, ["hover:border-blue-400", "hover:shadow-sm"]);
  checkWinner(id);
}

function checkWinner(userChoice) {
  computerChoice = Math.floor(Math.random() * 3) + 1;
  showComputerChoice(computerChoice);
  if (userChoice == computerChoice) {
    countDownPara.textContent = "Game Draw";
  } else if (
    (computerChoice == 1 && userChoice == 2) ||
    (computerChoice == 2 && userChoice == 3) ||
    (computerChoice == 3 && userChoice == 1)
  ) {
    countDownPara.textContent = "You Won";
    userScore++;
    updateScore("user", userScore);
  } else {
    countDownPara.textContent = "You Lost";
    computerScore++;
    updateScore("computer", computerScore);
  }
  currentRound++;
  roundTime--;
  prepareNextRound(roundTime);
}
function countDownTimer(count) {
  if (count != 0) {
    setTimeout(() => {
      count--;
      countDownPara.textContent = count;
      countDownTimer(count);
    }, 1200);
  } else {
    countDownPara.textContent = "Go";
    removeClass([countDownPara], ["animate-[bounce_1s_ease-in-out_infinite]"]);
    init();
  }
}

function showComputerChoice(computerChoice) {
  addClass(
    [computerControls[computerChoice - 1]],
    ["bg-gray-100", "border-blue-100"]
  );
}
function removeComputerChoice(computerChoice) {
  removeClass(
    [computerControls[computerChoice - 1]],
    ["bg-gray-100", "border-blue-100"]
  );
}

function prepareNextRound(round) {
  if (!round == 0) {
    setTimeout(removeClass([nextRoundBtn], ["hidden"]), 1000);
  } else {
    removeClass([finalDiv], ["hidden"]);
    addClass([countDownDiv], ["hidden"]);
    checkWhoWonTheMatch();
  }
}

function nextRound() {
  currentRoundDispaly.textContent = currentRound;
  addClass([nextRoundBtn], ["hidden"]);
  removeClass([selectedBtn], ["bg-gray-100", "border-blue-100"]);
  removeComputerChoice(computerChoice);
  startGame();
}

function resetAll() {
  addClass([finalDiv], ["hidden"]);
  removeClass([choicesDiv], ["hidden"]);
  removeClass([selectedBtn], ["bg-gray-100", "border-blue-100"]);
  removeComputerChoice(computerChoice);
  userScore = 0;
  computerScore = 0;
  updateScore("user", userScore);
  updateScore("computer", computerScore);
  document.querySelector("select").selectedIndex = 0;
  currentRound = 1;
  currentRoundDispaly.textContent = "1";
  addClass([error_message], ["hidden"]);
}

function updateScore(type, score) {
  if (type == "user") {
    userScorePara.textContent = score;
  } else {
    computreScorePara.textContent = score;
  }
}

function checkWhoWonTheMatch() {
  if (userScore > computerScore) {
    statusOfWin.textContent = "You Won";
    removeClass([userFireWork], ["hidden"]);
    setTimeout(() => {
      addClass([userFireWork], ["hidden"]);
    }, 2500);
  } else if (computerScore > userScore) {
    statusOfWin.textContent = "You Lost";
    removeClass([computerFireWork], ["hidden"]);
    setTimeout(() => {
      addClass([computerFireWork], ["hidden"]);
    }, 2500);
  } else {
    statusOfWin.textContent = "Game Draw";
  }
}

function keyboardControls() {
  document.onkeydown = (element) => {
    if (element.key == "Tab") element.preventDefault();
    else if (element.key.toLowerCase() === "r" && gameEnableKey) btnSelected(1);
    else if (element.key.toLowerCase() === "p" && gameEnableKey) btnSelected(2);
    else if (element.key.toLowerCase() === "s" && gameEnableKey) btnSelected(3);
    else if (element.key.toLowerCase() === " ") {
      if (!finalDiv.classList.contains("hidden")) {
        resetAll();
      } else if (!nextRoundBtn.classList.contains("hidden")) {
        nextRound();
      } else if (!choicesDiv.classList.contains("hidden")) {
        checkCondition();
      }
    }
  };
}

