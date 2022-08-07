const grid = document.getElementById("grid");
const scoreElement = document.getElementById("score");
const movesElement = document.getElementById("moves");

const cards = ["🍇", "🍈", "🍉", "🍌", "🍍", "🥑", "🍆", "🥔"];
let board = [];

function generateBoard() {
  board = cards.concat(cards).sort(() => 0.5 - Math.random());

  for (let index = 0; index < board.length; index++) {
    let box = document.createElement("div");
    box.classList.add("box");
    box.setAttribute("data-id", index);
    box.addEventListener("click", flipCard);
    let frontCard = document.createElement("div");
    frontCard.classList.add("front-face");
    let backCard = document.createElement("div");
    backCard.classList.add("back-face");
    box.appendChild(frontCard);
    box.appendChild(backCard);
    grid.appendChild(box);
  }
}

let score = 0;
let moves = 0;
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

function checkMatch() {
  const isMatch = firstCard.textContent === secondCard.textContent;

  if (isMatch) {
    scoreElement.textContent = ++score;
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetCardsSelected();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.lastChild.textContent = "";
    secondCard.lastChild.textContent = "";
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetCardsSelected();
  }, 500);
}

function resetCardsSelected() {
  [firstCard, secondCard] = [null, null];
  hasFlippedCard = false;
  lockBoard = false;
}

function flipCard() {
  if (lockBoard) {
    return;
  }
  if (this === firstCard) {
    return;
  }
  movesElement.textContent = ++moves;
  this.classList.add("flip");

  this.lastChild.textContent = board[this.getAttribute("data-id")];
  if (!hasFlippedCard) {
    firstCard = this;
    hasFlippedCard = true;
    return;
  }
  secondCard = this;
  checkMatch();
}

generateBoard();
