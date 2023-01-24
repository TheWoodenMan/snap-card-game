// Variables

let deckID;

const pile1 = document.querySelector("#pile1");
const pile2 = document.querySelector("#pile2");
const label = document.querySelectorAll("label");
const turnDisplay = document.querySelector("#turnDisplay");
const bigHand = document.querySelector("#bigHand");
const span = document.querySelector("span");

let compTurnTimer;
let compSnapTimer;

let yourTurn = false;
let yourCardValue = "100";

let compTurn = true;
let compCardValue = "50";

let activeDeck;
let cardData;
let cardCount = 0;
let snapPossible = false;

let score;
let playerScore;

if (localStorage.getItem("playerScore")) {
	score = localStorage.getItem("playerScore");
} else {
	score = 0;
}

console.log(playerScore);
span.innerHTML = `Score: ${score}`;

// Event listeners

// Draws the first card
window.addEventListener("load", getFetch);

// Buttons
document.querySelector("#drawButton").addEventListener("click", checkTurn);
document.querySelector("#snapButton").addEventListener("click", snapCheck);
document.querySelector("#resetButton").addEventListener("click", resetAll);

// Function to play a sound when a card is drawn
function dealCardSound() {
	new Audio("sound/240777__f4ngy__dealing-card.wav").play();
}

// Initial deck setup.
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

// Draw button disabled unless it's your turn
function checkTurn() {
	if (yourTurn === true) {
		drawCard();
	}
}

function drawCard() {
	// Large function that handles triggers and rules after a card is drawn

	cardCount++;

	if (cardCount >= 52) {
		turnDisplay.innerText = "Out of Cards! Drawing a New Deck";
		setTimeout(resetAll, 3000);
	}

	// Set active deck from local storage.
	activeDeck = localStorage.getItem(deckID);
	console.log(`Active Deck is ${activeDeck}`);

	// Clear Comp win Condition if player draws while snap possible

	clearTimeout(compTurnTimer);

	// Draw the card using the api and display it in the DOM
	const drawUrl = `https://deckofcardsapi.com/api/deck/${activeDeck}/draw/?count=1`;

	fetch(drawUrl)
		.then((res) => res.json()) // parse response as JSON
		.then((data) => {
			// Set the drawn card data to a variable
			cardData = data.cards;
			console.log(data.cards);
			yourTurn
				? (compCardValue = cardData[0].value)
				: (yourCardValue = cardData[0].value);
			console.log(compCardValue);
			console.log(yourCardValue);

			yourCardValue === compCardValue ? startCompWin() : console.log("no snap");

			// Divert the image to the correct pile depending on whose turn it is.
			compTurn
				? (pile2.src = data.cards[0]["image"])
				: (pile1.src = data.cards[0]["image"]);
		})
		.catch((err) => {
			console.log(`error ${err}`);
		});

	dealCardSound();

	// On any turn and if a snap is possible, start computer snap timer.

	if (yourTurn) {
		// Remove the hidden pile but only on your turn after you draw a card
		label.forEach((label) => label.classList.remove("hidden"));

		// Instructions to change to computers turn.
		turnDisplay.innerText = "Computer's Turn";
		compTurn = true;
		yourTurn = false;

		!snapPossible ? startCompTurn() : console.log("snap possible");
	} else if (compTurn) {
		turnDisplay.innerText = "Your Turn";
		compTurn = false;
		yourTurn = true;
	}
}

function startCompTurn() {
	compTurnTimer = window.setTimeout(
		drawCard,
		(Math.floor(Math.random() * 3) + 2) * 1000
	);
}

function snapCheck() {
	if (yourCardValue === compCardValue) {
		turnDisplay.innerText = "SNAP! Congrats, You Win!!";
		score++;
		localStorage.setItem("playerScore", score);
		document.querySelector("span").innerHTML = `Score: ${score}`;
		clearTimeout(compTurnTimer);
		clearTimeout(compSnapTimer);
		new Audio("sound/52322__stephsinger22__cheering.wav").play();
	}
}

function startCompWin() {
	clearTimeout(compTurnTimer);
	compSnapTimer = window.setTimeout(
		compWins,
		(Math.floor(Math.random() * 7) + 2) * 1000
	);
}

function compWins() {
	turnDisplay.innerText = "Computer Wins! (=^･ω･^=)";
	clearTimeout(compTurnTimer);
	new Audio("sound/572606__melisandepope__haha01.wav").play();
	bigHand.classList.remove("hidden");
}

function resetAll() {
	window.location.reload();
}
