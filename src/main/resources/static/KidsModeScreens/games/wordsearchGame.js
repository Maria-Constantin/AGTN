/*
	Generic word search implementation 
*/

var correctAnswers = 0;
var quiz_complete = false;
var timer;
var submitted = [];

// get user input
var userAnswer = document.getElementById("userAnswer");

// add score text to the space
var score = document.getElementById("score");


// get submit button
const inPut = document.getElementById("submitInput");


// bool for currently selected option
var selected = "";
var start = true;
var end = true;



// generate first question
update_question();
var questionIndex = 0;
score.innerHTML = "Score: " + correctAnswers + "/9";

function next_question() {
	if(selected == "true") {
		
		++correctAnswers;
		selected = "";
	} 
	if(questionIndex < 20) { // max attempts of game is 50
		questionIndex++;
		update_question();
	} else {
		// display score
		quiz_complete = true;
		inPut.innerText = "Game Menu";
		score.innerHTML = "Score: " + correctAnswers + " out of 9";
		document.getElementById('wordSearch').src="../../FrontEndImages/game_over.gif";
		if(end)
		{
            document.getElementById("userAnswer").remove();
			document.getElementById("timer").remove();
			end = false;
		}
	
	}
}

function update_question() {
	userAnswer = document.getElementById("userAnswer").value;
     // we do the for loop here , where we iterate through json values to find correct one 
     for(let i = 0; i < Answers.length; i++) {
        let obj = Answers[i];
		for(let g = 0; g < obj.a.length; g++){
		
        if(obj.a[g].answer == userAnswer)
        {
            selected = "true"
			score.innerHTML = "Score: " + correctAnswers + "/9";
			if(start)
		{
		   ++correctAnswers;
		   score.innerHTML = "Score: " + correctAnswers + "/9";
           start = false;
		}

        }
	}
    }
	
	


}

inPut.addEventListener("click", () => {
	// upon clicking button, submits the answers to
	userAnswer = document.getElementById("userAnswer");
	if(quiz_complete) {
        window.location.href = '../games.html';
	}
	if(userAnswer.value != "")
	{
		
	  if ((submitted.includes(userAnswer.value)) == false)
	   {
		    submitted.push(userAnswer.value);
			
	      if(!quiz_complete) {
                next_question();
		         userAnswer = document.getElementById("userAnswer").value = '';
		
	      } else {
		        window.location.href = '../games.html';
	        }
       }
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
		quiz_complete = "true";
		inPut.innerText = "Game Menu";
		score.innerHTML = "Score: " + correctAnswers + " out of 9";
		document.getElementById('wordSearch').src="../../FrontEndImages/game_over.gif";
		if(end)
		{
            document.getElementById("userAnswer").remove();
			document.getElementById("timer").remove();
			end = false;
		}
	
		
		timer = duration;
    }
	},1000);
}


// //start timer on window load
window.onload = function countdown(){
    var fiftyNineSeconds = 59, display = document.getElementById("seconds");
    startTimer(fiftyNineSeconds, display);
};