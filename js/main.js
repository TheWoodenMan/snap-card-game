// Variables

let deckID;
let score = 0;

const pile1 = document.querySelector("#pile1");
const pile2 = document.querySelector("#pile2");
const label = document.querySelectorAll("label");
const turnDisplay = document.querySelector("#turnDisplay");

let yourTurn = false;
let yourCardValue = "";

let compTurn = true;
let compCardValue = "";

let activeDeck;
let cardData;

// Event listeners
window.addEventListener("load", getFetch);
document.querySelector("#drawButton").addEventListener("click", drawCard);
document.querySelector("#snapButton").addEventListener("click", snapCheck);

function dealCardSound() {
  new Audio("sound/240777__f4ngy__dealing-card.wav").play();
}

function getFetch() {
  const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(`deck data is ${data}`);
      localStorage.setItem(deckID, data.deck_id);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
  new Audio("sound/630498__jimbo555__shuffling-cards.wav").play();
  drawCard();
}

function drawCard() {
  activeDeck = localStorage.getItem(deckID);
  console.log(`Active Deck is ${activeDeck}`);

  const drawUrl = `https://deckofcardsapi.com/api/deck/${activeDeck}/draw/?count=1`;
  // Draw the card using the api and display it in the DOM
  fetch(drawUrl)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      cardData = data.cards;
      console.log(`Data on drawn card is ${cardData}`);
      compTurn
        ? (pile2.src = data.cards[0]["image"])
        : (pile1.src = data.cards[0]["image"]);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });

  dealCardSound();

  if (yourTurn) {
    label.forEach((label) => label.classList.remove("hidden"));
    turnDisplay.innerText = "Computer's Turn";
    compTurn = true;
    yourTurn = false;
    localStorage.setItem(compCardValue, cardData[0].value);
    console.log(localStorage.getItem(compCardValue));
  } else if (compTurn) {
    turnDisplay.innerText = "Your Turn";
    compTurn = false;
    yourTurn = true;
    localStorage.setItem(yourCardValue, cardData[0].value);
    console.log(localStorage.getItem(yourCardValue));
  }
}

function snapCheck() {
  if (yourCardValue === compCardValue) {
    turnDisplay.innerText = "SNAP! Congrats!";
    score++;
    new Audio("sound/52322__stephsinger22__cheering.wav").play();
  }
}
