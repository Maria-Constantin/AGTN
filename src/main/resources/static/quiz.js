/*
	Generic quiz implementation 
*/

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const notRandom = urlParams.get('notRandom');
console.log(notRandom);

var correctAnswers = 0;
var quiz_complete = false;
var timer;

// get the score HTML element
const score = document.getElementById("score");

// get the question text
const question = document.getElementById("question");

// get the question options
const op1 = document.getElementById("op1");
const op2 = document.getElementById("op2");
const op3 = document.getElementById("op3");

// bool for currently selected option
var selected = "";

// randomise question order
const questionArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const shuffledQuestionArray = questionArray.sort((a, b) => 0.5 - Math.random());

// generate first question
update_question(0);
var questionIndex = 0;


/**
 * Go to the next question
 * If the quiz is complete, display score
 */
function next_question() {
	if(selected == "true" && !quiz_complete) {
		// increment correct answer counter
		++correctAnswers;
	} 
	if(questionIndex < 9) {
		questionIndex++;
		resetTimer();
		update_question(questionIndex);
	} else {
		// display score
		quiz_complete = true;
		question.innerText = "Score: " + correctAnswers + " out of 10";

		score.remove();
		op1.innerText = "Quiz Menu";
		op2.remove();
		op3.remove();
		document.getElementById("timer").remove();
	}
}


/**
 * Display questions in random order
 * @param {*} id question id
 */
function update_question(id) {

	var currentQuestion = Questions[notRandom ? id : shuffledQuestionArray[id]];

	// set the question text
	question.innerText = currentQuestion.q;

	// random option order
	const answerArray = [0, 1, 2];
	const shuffledAnswerArray = answerArray.sort((a, b) => 0.5 - Math.random());

	score.innerText = "Score: " + correctAnswers + "/10";

	// provide option text
	op1.innerText = currentQuestion.a[notRandom ? 0 : shuffledAnswerArray[0]].text;
	op2.innerText = currentQuestion.a[notRandom ? 1 : shuffledAnswerArray[1]].text;
	op3.innerText = currentQuestion.a[notRandom ? 2 : shuffledAnswerArray[2]].text;

	// provide true/false value to the options
	op1.value = currentQuestion.a[notRandom ? 0 : shuffledAnswerArray[0]].isCorrect;
	op2.value = currentQuestion.a[notRandom ? 1 : shuffledAnswerArray[1]].isCorrect;
	op3.value = currentQuestion.a[notRandom ? 2 : shuffledAnswerArray[2]].isCorrect;
}


op1.addEventListener("click", () => {
	if(!quiz_complete) {
		selected = op1.value;
		next_question();
	} else {
		window.location.href = '../quiz.html';
	}
})

op2.addEventListener("click", () => {
	selected = op2.value;
	next_question();
})

op3.addEventListener("click", () => {
	selected = op3.value;
	next_question();
})


/**
 * Timer script - it waits a full second before starting
 * @param {*} duration 10 seconds timer duration
 * @param {*} display show content on html div section
 */
function startTimer(duration, display){
    timer = duration;
	var seconds;
            
    setInterval(function(){
    seconds = parseInt(timer%60, 10);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = seconds;

    //if timer reaches 0, next question
    if(--timer < 0 && !quiz_complete){
		//set to 0, don't go to negative time
		timer = 0;
		selected = false;	// no answer selected so default to false
		next_question();
		//reset timer
		timer = duration;
    }
	},1000);
}


/**
 * Reset timer to 10 seconds
 */
function resetTimer(){
	timer = 10;
}


/**
 * Start timer on window load
 */
window.onload = function countdown(){
    var tenSeconds = 10, display = document.getElementById("seconds");
    startTimer(tenSeconds, display);
};