//when click start quiz
    //start timer
    //show question
    //show clickable answers
        // if wrong, deduct time
    //clicking on answer displays next questions
    //also says whether previous answer was right or wrong.
    //after 5 questions, OR when time is up show end screen
        //says player's score (time left)
        //asks to enter initials and hit send
            //save the initials
            //add them to the high score list
            //display all scores? In numerical order?

        //Display "start quiz again" button
        
//--------------------------------Variables

//finds intro element
var introEl = document.querySelector("#intro");
//find start button
var startButtonEl = document.querySelector("#start-button");
//finds quiz section element
var quizEl = document.querySelector("#quiz-area");
//finds high score sections
var highScoreEl = document.querySelector("#high-score");
//round number
var round = 0;
//time left
var timeSeconds = 100;
//time Element
var timeSecondsEl = document.querySelector("#seconds");
//time-message
var timeMessageEl = document.querySelector("#time-message");
//footer (back to main button)
var footerEl = document.querySelector("#footer");
//grade the answer right or wrong
var gradeAnswerEl = document.querySelector("#grade-answer");



//array of questions
var questionArr= [
    "What does HTML stand for?", 
    'What is a "div"?',
    "How many types of javascript functions are there?"
];
//array of answer arrays MUST HAVE SAME AMOUNT OF ARRAYS AS THERE ARE QUESTIONS
var answersArr1 = [
    ["red", "red", "green", "red"],
    ["blue", "blue", "blue", "yellow"],
    ["yellow", "yellow", "purple", "yellow"],
    
]

//------------------------------Variable functions
var startQuiz = function() {
    //event.preventDefault();
    introEl.textContent = "";

    round= 0;
    //start timer
    countdown();
   //start questions 
   askQuestion(round);
};    

 // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
 var timerInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    timeSecondsEl.textContent = timeSeconds;
    if (timeSeconds > 1) {
     timeSeconds--;
     console.log(timeSeconds);
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timeSecondsEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timerInterval);
      // Call the "game Over" elements
      timeMessageEl.textContent = "GAME OVER!";
      //Call High Scores Screen
      highScoreScreen();
    }
  }, 1000);

// Timer that counts down from 5
function countdown() {
    timeSeconds= 100;
    timerInterval;
}


var askQuestion = function(questionNumber) {
    
    //makes box for questions
    var questionBoxEl = document.createElement("div");
    //makes question
    var questionH2El = document.createElement("h2");
    //makes answer box
    var answersBoxEl = document.createElement("div");
    //makes answers list
    var answerListEl = document.createElement("ol");
    
    //call quiz div
    quizEl.appendChild(questionBoxEl);
    //call quiz h2
    questionBoxEl.appendChild(questionH2El);
    //call new question
    questionH2El.textContent = questionArr[round];
        
    //call answer area
    quizEl.appendChild(answersBoxEl);
    //call answer list
    answersBoxEl.appendChild(answerListEl);
    

    for (var i = 0; answersArr1[round][i]; i++) {
        //calls list element
        var answerEl = document.createElement("li");
        //assigns answerEl with a specific
        answerEl.textContent = answersArr1[round][i];
        answerListEl.appendChild(answerEl);
        if (round + 1 > questionArr.length) {  
        highScoreScreen();
    }    
        
    }
        console.log(round + 1);
        console.log(questionArr.length);
        
        answerListEl.addEventListener("click", chooseAnswer);
    
    

}; 

var chooseAnswer = function() {
      //get the current selected option's value and makes lowercase
    var statusValue = JSON.stringify(event.target);
    console.log(statusValue);
    if (statusValue === "green") {
        gradeAnswerEl.textContent = "Correct!"
        console.log("correct answer");
    } else {
        console.log("wrong answer");
        gradeAnswerEl.textContent = "Wrong!"
        timeSeconds -= 20; 
    }

    //empties current content in the quiz.
    quizEl.textContent = "";
    //add to round
    round++;
    //goes to next question or to high score page
    if (round + 1 > questionArr.length) {  
        clearInterval(timerInterval);
        highScoreScreen();
    } else {
        askQuestion(round);
    }
    
}

var highScoreScreen = function() {
    //prevents refreshing on submit
    event.preventDefault();
    //main high score div
    var highScoreDivEl = document.createElement("div");
    //h3 for high score
    var highScoreH3El = document.createElement("h3");
    //form element
    var initialFormEl = document.createElement("form");
    //input element
    var initialsInputEl = document.createElement("input");
                //initialsInputEl.className = "player-initials";
    //initialsInputEl.setAttribute("initials", initial)
    //submit button
    var submitInitialsButtonEl = document.createElement("button");
    submitInitialsButtonEl.textContent = "Submit";
    //back to main button
    var backToMainButtonEl = document.createElement("button");
    backToMainButtonEl.textContent = "Back to Main";



    timeMessageEl.textContent = "All done!";
    quizEl.textContent = "";
    highScoreH3El.textContent = "Your score is " + timeSeconds + ". Enter your initials to submit your high score."
    
    footerEl.appendChild(backToMainButtonEl);
    highScoreEl.appendChild(highScoreDivEl);
    highScoreDivEl.appendChild(highScoreH3El);
    highScoreDivEl.appendChild(initialFormEl);
    initialFormEl.appendChild(initialsInputEl);
    highScoreDivEl.appendChild(submitInitialsButtonEl);
    
    backToMainButtonEl.addEventListener("click", backToMain);
    submitInitialsButtonEl.addEventListener("click", saveShowHighScore);
}

var saveShowHighScore = function() {
    //save what's in the form
    //localStorage.setItem( , )
    //clear out "high score"
    highScoreEl.textContent = "";
    
}

var backToMain = function() {
    // var backButtonEl = document.createElement("button");
    // backButtonEl.addEventListener("click", backToMain);
    // introEl.appendChild(this.document);
    // introEl.createElement(introEl);
    console.log("clicked!");

    //revert time message
    timeMessageEl.textContent = "Time left: ";
    //clear out high score section
    //quizEl.textContent = "";
    highScoreEl.textContent = "";
    
    //make new elements for intro div
    //may need to retype them all in here
    document.appendChild(introEl);

}


//--------------------------------actual code

startButtonEl.addEventListener("click", startQuiz);



