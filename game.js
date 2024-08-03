// game.js

import { createDeck, drawCards } from "./deck.js";

let deckId;
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

export async function startNewGame() {
  deckId = await createDeck();
  playerHand = await drawCards(deckId, 2);
  dealerHand = await drawCards(deckId, 2);
  gameOver = false;
  updateScores();
  updateUI();
  document.getElementById("result").innerText = "";
}

export async function hit() {
  if (!gameOver) {
    const newCard = await drawCards(deckId, 1);
    playerHand.push(newCard[0]);
    updateScores();
    updateUI();
    checkForBust();
  }
}

export async function stand() {
  if (!gameOver) {
    gameOver = true;
    while (dealerScore < 17) {
      const newCard = await drawCards(deckId, 1);
      dealerHand.push(newCard[0]);
      updateScores();
      updateUI();
      if (dealerScore >= 17) {
        checkForWinner();
      }
    }
  }
}

function updateScores() {
  playerScore = calculateScore(playerHand);
  dealerScore = calculateScore(dealerHand);
  document.getElementById("player-score").innerText = `Score: ${playerScore}`;
  document.getElementById("dealer-score").innerText = `Score: ${dealerScore}`;
}

function calculateScore(hand) {
  let score = 0;
  let hasAce = false;
  hand.forEach((card) => {
    if (card.value === "ACE") {
      hasAce = true;
      score += 11;
    } else if (["KING", "QUEEN", "JACK"].includes(card.value)) {
      score += 10;
    } else {
      score += parseInt(card.value);
    }
  });
  if (score > 21 && hasAce) {
    score -= 10;
  }
  return score;
}

function updateUI() {
  const playerCardsDiv = document.getElementById("player-cards");
  const dealerCardsDiv = document.getElementById("dealer-cards");
  playerCardsDiv.innerHTML = "";
  dealerCardsDiv.innerHTML = "";

  playerHand.forEach((card) => {
    const img = document.createElement("img");
    img.src = card.image;
    playerCardsDiv.appendChild(img);
  });

  dealerHand.forEach((card) => {
    const img = document.createElement("img");
    img.src = card.image;
    dealerCardsDiv.appendChild(img);
  });
}

function checkForBust() {
  if (playerScore > 21) {
    document.getElementById("result").innerText = "You bust! Dealer wins!";
    gameOver = true;
  }
}

function checkForWinner() {
  if (dealerScore > 21) {
    document.getElementById("result").innerText = "Dealer busts! You win!";
  } else if (dealerScore >= playerScore) {
    document.getElementById("result").innerText = "Dealer wins!";
  } else {
    document.getElementById("result").innerText = "You win!";
  }
}
