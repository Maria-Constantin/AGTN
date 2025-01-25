let firstCard = null; // first card clicked
let secondCard = null; // second card clicked
let hasFlippedCard = false; // whether the second card has flipped
let lockBoard = false;
let numMatches = 0;// total number of matches
let game_complete = false;


var score = document.getElementById("score"); // where score is displayed

const match = document.getElementById("gameTitle"); // where the title is stored

var reset = document.getElementById("reset-button"); // works as game menu button and reset in the middle of the game.


const cards = document.querySelectorAll('.card');
let numbers = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
let shuffled = numbers.sort(() => Math.random() - 0.5);

let i = 0;
//randomises the cards everytime.
cards.forEach(card => {

    card.dataset.card = shuffled[i];	
    i++;
  });

// function to flip cards when clicked
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

	if(firstCard.dataset.card == 1)
	{
		document.getElementById(firstCard.id).src="../../FrontEndImages/robinHMemMatch.jpg";
	}

	if(firstCard.dataset.card == 2)
	{
		document.getElementById(firstCard.id).src="../../FrontEndImages/wollatonHMemMatch.jpeg";
	}

	if(firstCard.dataset.card == 3)
	{
		document.getElementById(firstCard.id).src="../../FrontEndImages/marketSMemMatch.jpg";
	}

	if(firstCard.dataset.card == 4)
	{
		document.getElementById(firstCard.id).src="../../FrontEndImages/nottinghamCMemMatch.jpg";
	}

  if(firstCard.dataset.card == 5)
	{
		document.getElementById(firstCard.id).src="../../FrontEndImages/cityCavesMemMatch.jpg";
	}

  if(firstCard.dataset.card == 6)
	{
		document.getElementById(firstCard.id).src="../../FrontEndImages/arboretumMemMatch.jpg";
	}

    return;
  }

  
 
  secondCard = this;

   if(secondCard.dataset.card == 1)
	{
	
		document.getElementById(secondCard.id).src="../../FrontEndImages/robinHMemMatch.jpg";
	}

	if(secondCard.dataset.card == 2)
	{
		document.getElementById(secondCard.id).src="../../FrontEndImages/wollatonHMemMatch.jpeg";
	}

	if(secondCard.dataset.card == 3)
	{
		document.getElementById(secondCard.id).src="../../FrontEndImages/marketSMemMatch.jpg";
	}

	if(secondCard.dataset.card == 4)
	{
		document.getElementById(secondCard.id).src="../../FrontEndImages/nottinghamCMemMatch.jpg";
	}

  if(secondCard.dataset.card == 5)
	{
		document.getElementById(secondCard.id).src="../../FrontEndImages/cityCavesMemMatch.jpg";
	}

  if(secondCard.dataset.card == 6)
	{
		document.getElementById(secondCard.id).src="../../FrontEndImages/arboretumMemMatch.jpg";
	}
    
  checkForMatch();
}

// function to check if cards are a match or not

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  isMatch ? disableCards() : unflipCards();
}

// function when cards are matched, and termed as as "matched", also counst the number of matches made for the game

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  firstCard.classList.add('matched');
  secondCard.classList.add('matched');

  resetBoard();
  numMatches++;

  if (numMatches == 6) {

	    game_complete = true;
		document.getElementById("timer").remove();

		var match = document.getElementById("gameTitle");
		match.innerHTML = "";
		const img = document.createElement("img");
        img.src = "../../FrontEndImages/game_over.gif";
        match.appendChild(img);

		const item = document.createElement("BUTTON");
		item.className = "game-menu";
		item.innerHTML = "Game Menu"

        reset.appendChild(item);
		let mySound = new Audio('../../soundEffects/gameEnd.wav');
        mySound.play()
		
		score.innerHTML = "Score: " + numMatches + " out of 6";
		document.getElementById("numberone").remove();
		document.getElementById("numbertwo").remove();
		document.getElementById("numberthree").remove();
		document.getElementById("numberfour").remove();
		document.getElementById("numberfive").remove();
		document.getElementById("numbersix").remove();
		document.getElementById("numberseven").remove();
		document.getElementById("numbereight").remove();
		document.getElementById("numbernine").remove();
		document.getElementById("numberten").remove();
		document.getElementById("numbereleven").remove();
		document.getElementById("numbertwelve").remove();
   
  }
}
// flips cards whenn the match is not made

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
	document.getElementById(firstCard.id).src="../../FrontEndImages/adventure-guide-logo.png";
	document.getElementById(secondCard.id).src="../../FrontEndImages/adventure-guide-logo.png";

    resetBoard();
  }, 1000);
}
// resets board state when match is not made

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];

}

// resets game upon completion of it, or if the user clicks on button

function resetGame() {
  cards.forEach(card => {
    card.classList.remove('flip', 'matched');
    card.addEventListener('click', flipCard);
	document.getElementById(card.id).src="../../FrontEndImages/adventure-guide-logo.png";

  });
  numMatches = 0;
}

cards.forEach(card => card.addEventListener('click', flipCard));
//document.querySelector('#reset-button').addEventListener('click', resetGame);

reset.addEventListener("click", () => {
    if(game_complete = false)
	{
	resetGame();
	}
	else
	{
		window.location.href = '../games.html';
	}
	
})

//timer script; it waits a full second before starting
function startTimer(duration, display){
    timer = duration;
	var seconds;
            
    setInterval(function(){
    seconds = parseInt(timer%60, 10);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = seconds;

    //if timer reaches 0, next question
    if(--timer < 0){
		//set to 0, don't go to negative time
		timer = 0;
		game_complete = true;
		document.getElementById("timer").remove();

		var match = document.getElementById("gameTitle");
		match.className = "over-title";
		match.innerHTML = "";
		const img = document.createElement("img");
		img.className = "end-game";
        img.src = "../../FrontEndImages/game_over.gif";
        match.appendChild(img);
		const item = document.createElement("BUTTON");
		item.className = "game-menu";
		item.innerHTML = "Game Menu"
        reset.appendChild(item);
		let mySound = new Audio('../../soundEffects/gameEnd.wav');
        mySound.play()

		score.innerHTML = "Score: " + numMatches + " out of 6";
		document.getElementById("numberone").remove();
		document.getElementById("numbertwo").remove();
		document.getElementById("numberthree").remove();
		document.getElementById("numberfour").remove();
		document.getElementById("numberfive").remove();
		document.getElementById("numbersix").remove();
		document.getElementById("numberseven").remove();
		document.getElementById("numbereight").remove();
		document.getElementById("numbernine").remove();
		document.getElementById("numberten").remove();
		document.getElementById("numbereleven").remove();
		document.getElementById("numbertwelve").remove();
		// ucaught error here, have to make it stop counting backwards.

		//reset timer
		timer = duration;
    }
	},1000);
}


// //start timer on window load
window.onload = function countdown(){
    var fiftyNineSeconds = 59, display = document.getElementById("seconds");
    startTimer(fiftyNineSeconds, display);
};
