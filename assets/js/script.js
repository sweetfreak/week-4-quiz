//GLOBAL VARIABLES

//finds intro element
var introEl = document.querySelector("#intro");
//find start button
var startButtonEl = document.querySelector("#start-button");
//finds quiz section element
var quizEl = document.querySelector("#quiz-area");
//finds high score sections
var highScoreEl = document.querySelector("#high-score");
//footer section
var footerEl = document.querySelector("#footer");
//round number
var round = 0;
//time left
var timeSeconds = 100;
//time Element
var timeSecondsEl = document.querySelector("#seconds");
//time-message
var timeMessageEl = document.querySelector("#time-message");
//grade the answer right or wrong
var gradeAnswerEl = document.querySelector("#grade-answer");
//backToMainBox
var backToMainBox = document.querySelector("#back-to-main-box")
//input for initials
//var initialsInputEl = document.createElement("input");

// global player variable
var highScoreList = []


//array of questions
var questionArr= [
    "What does HTML stand for?", 
    'What is a "div"?',
    "What does the 'i' stand for, in a for loop?"
];
//array of answer arrays MUST HAVE SAME AMOUNT OF ARRAYS AS THERE ARE QUESTIONS
var answersArr1 = [
    ["Hypertext Markup Language", "Hello, Tania, My Love", "Hyper Time Makeup Literature", "It doesn't stand for anything, like SAT"],
    ["a hole in the ground, short for divet", "the divider between cubicle desks in an open floor plan office", "a tag that defines a division or section in an HTML document", "who cares, man?"],
    ["i stands for the user input", "the i is just a variable, it could be anything, but it typically means acts as an 'index'", "i stand for, myself, as in, me - the self - I think, therefore I am.", "imaginary number."],
    
]

var players = [];

//------------------------------Variable functions
var loadHighScores= function() {
    var savedScores = localStorage.getItem("highScores");
    highScoreList = savedScores;

    console.log(savedScores);

    if (highScoreList) {
        highScoreList = JSON.parse(highScoreList);
        console.log("saved data: " + (highScoreList));
    } else {
        highScoreList = [];
        console.log("no saved data " + savedScores)
        return false;
    }
}

var startQuiz = function() {
   
    introEl.textContent = "";

    timeSeconds= 100;
    round= 0;
    //start timer
    countdown();
    //start questions 
    askQuestion(round);

    
};    


// Timer that counts down from 5
function countdown() {
    //if round+1 is more than the number of questions, stop the clock
    if ((round + 1) > questionArr.length) {  
    clearInterval(timerInterval);
    }
    //starts counting down
    var timerInterval = setInterval(function () { 
        //makes this element text equal the seconds left
        timeSecondsEl.textContent = timeSeconds;
        // keep counting down if there's time left, and the round number isn't more than the amount of questions
        if (timeSeconds >= 1 && round +1 <= questionArr.length) {
            timeSeconds--;
            console.log(timeSeconds);
        }  
        //time timer reaches 0
        else if (timeSeconds === 0){
            // set timer text to empty string 
            timeSecondsEl.textContent = '';
            // Use `clearInterval()` to stop the timer
            clearInterval(timerInterval);
            // Change timeMessage text to
            timeMessageEl.textContent = "GAME OVER!";
            //Call High Scores Screen
            highScoreScreen();
        }
        //1000 milliseconds between each interval
    }, 1000);
}


var askQuestion = function(questionNumber) {
    //test
    
    //creates box for questions
    var questionBoxEl = document.createElement("div");
    questionBoxEl.className = "quiz-box";
    //creates h2 element forquestion
    var questionH2El = document.createElement("h2");
    //creates box for list of answers
    var answersBoxEl = document.createElement("div");
    answersBoxEl.className = "quiz-box"
    //creates answers ordered list
    var answerListEl = document.createElement("ol");
    answerListEl.className = "answer-list"

    //adds question box to quiz el
    quizEl.appendChild(questionBoxEl);
    //adds question h2 el to question box
    questionBoxEl.appendChild(questionH2El);
    //inputs text to question h2 el, based on the round
    questionH2El.textContent = questionArr[round];
    //adds answers box
    quizEl.appendChild(answersBoxEl);
    //adds answers list ol element
    answersBoxEl.appendChild(answerListEl);
    
    //Adds li elements for all answers, based on the round number
    //condition may be incorrect, but it works?
    for (var i = 0; answersArr1[round][i]; i++) {
        //calls list element
        var answerEl = document.createElement("li");
        //gives it a class name for CSS
        answerEl.className = "answer-text";
        //assigns answerEl with specific answer text
        answerEl.textContent = answersArr1[round][i];
        //adds answer li element with text to answer Ol list
        answerListEl.appendChild(answerEl);
      
    }
    console.log("round " + round);
    console.log(questionArr.length);
    // Event listener = when the answer list el is clicked, chooseAnswer function runs   
    answerListEl.addEventListener("click", chooseAnswer);
    
    
}; 

//could this be a switch case instead??
var chooseAnswer = function(event) {

    //assigns text content of whatever was clicked on to the statusValue variable
    var statusValue = (event.target.textContent);
    console.log(statusValue);
    //checks if the textContent is the correct answer or not 
    //Writes correct/wrong in the gradeAnswerEl within the footer
    if (statusValue === "Hypertext Markup Language") {
        gradeAnswerEl.textContent = "Correct!"
        console.log("correct answer");
    } else if (statusValue === "a tag that defines a division or section in an HTML document") {
        gradeAnswerEl.textContent = "Correct!"
        console.log("correct answer");
    } else if (statusValue === "the i is just a variable, it could be anything, but it typically means acts as an 'index'") {
        gradeAnswerEl.textContent = "Correct!"
        console.log("correct answer");
    } else {
        console.log("wrong answer");
        gradeAnswerEl.textContent = "Wrong!"
        timeSeconds -= 20; 
    }

    //empties current content in the quiz.
    quizEl.textContent = "";
  //asks another question if there's still time and the round number equal to number of questions
    if (round + 1 < questionArr.length && timeSeconds >= 1) {  
             //+1 to round 
            round++;
            askQuestion(round);
    } else {
        //still need to add round so the timer stops
        round++;
        highScoreScreen();
    }
    
}

var highScoreScreen = function() {
    console.log("loading high score screen");
    //prevents refreshing on submit
    //event.preventDefault();
    //main high score div
    var highScoreDivEl = document.createElement("div");
    //h3 for high score
    var highScoreH3El = document.createElement("h3");
    //form element
    var initialFormEl = document.createElement("form");
    //input element
    initialsInputEl = document.createElement("input");
    initialsInputEl.id = "initials-input";
    initialsInputEl.maxLength = 3;

    //submit button
    var submitInitialsButtonEl = document.createElement("button");
    submitInitialsButtonEl.textContent = "Submit";
    //back to main button
    var backToMainButtonEl = document.createElement("button");
    backToMainButtonEl.textContent = "Back to Main";



    timeMessageEl.textContent = "All done!";
    quizEl.textContent = "";
    highScoreH3El.textContent = "Your score is " + timeSeconds + ". Enter your initials to submit your high score."
    
    backToMainBox.appendChild(backToMainButtonEl);
    highScoreEl.appendChild(highScoreDivEl);
    highScoreDivEl.appendChild(highScoreH3El);
    highScoreDivEl.appendChild(initialFormEl);
    initialFormEl.appendChild(initialsInputEl);
    highScoreDivEl.appendChild(submitInitialsButtonEl);
    
    backToMainButtonEl.addEventListener("click", backToMain);

    //submit and show high scores
    
    submitInitialsButtonEl.addEventListener("click", function(){
        //won't reload page on submit
        //event.preventDefault();
        //clears gradeAnswerEl
        gradeAnswerEl.textContent = "";
        //player object
        var playerData = {
        initials: initialsInputEl.value,
        score: timeSeconds
        };

        //push to array of player objects
        highScoreList.push(playerData);
        
        // saves playerData
        localStorage.setItem("highScores", JSON.stringify(highScoreList));
        event.preventDefault();

       // console.log("players array after push: " + highScoreList);

        // clears the form 
        document.getElementById("initials-input").value="";

        //Clear area
        highScoreH3El.textContent = "";
        highScoreDivEl.removeChild(initialFormEl);
        highScoreDivEl.removeChild(submitInitialsButtonEl);
        timeMessageEl.textContent = "High Scores:"
    
        //gets items saved as strings
        var playerScoreString = localStorage.getItem("highScores");

       
        //parse back into Object
        highScoreList = JSON.parse(playerScoreString);

    var scoreListEl = document.createElement("ul");
    highScoreDivEl.appendChild(scoreListEl);
    //new code
    for (var i=0; i < highScoreList.length; i++) {
      //pass each task object into the 'createTaskEl' function
      var scoreEl = document.createElement("li");
      //scoreEl.textContent = highScoreList[i].
      scoreEl.textContent= "User: " + highScoreList[i].initials + " | Score: " + highScoreList[i].score;  
      scoreListEl.appendChild(scoreEl);
    }

    });
}

var backToMain = function() {
    loadHighScores();
    //removes back to main button
    backToMainBox.textContent = "";
    
    //resets time left/score message and timeSeconds variable
    timeMessageEl.innerHTML = "Time Left/Score: <span id='seconds'></span>"
    timeSecondsEl = document.querySelector("#seconds");
    timeSeconds = 100;
    timeSecondsEl.textContent = timeSeconds;
//intro welcome

//make new elements for introEl
var introWelcomeEl = document.createElement("h2");
introWelcomeEl.textContent = "Welcome to HTMLJavaQuiz";
var directionsEl = document.createElement("h4");
directionsEl.textContent = 'Hit the "Start Quiz" button to answer 5 questions on Javascript. Keep track of your time! Your time is your score, and answer questions incorrectly will deduct from your time.';
startButtonEl = document.createElement("button");
startButtonEl.id = "start-button";
startButtonEl.textContent = "Start Quiz!";
    highScoreEl.textContent = "";
    gradeAnswerEl.textContent = "";
    

    //append elements
    introEl.appendChild(introWelcomeEl);
    introEl.appendChild(directionsEl);
    introEl.appendChild(startButtonEl);
    //footerEl.textContent="";
    
    startButtonEl.addEventListener("click", startQuiz);

}


//--------------------------------actual code

//startButtonEl.addEventListener("click", startQuiz);
backToMain();


