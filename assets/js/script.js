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
//footer 
var footerEl = document.querySelector("#footer");
//grade the answer right or wrong
var gradeAnswerEl = document.querySelector("#grade-answer");
//input for initials
//var initialsInputEl = document.createElement("input");


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
var startQuiz = function(event) {
   
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

   if ((round + 1) > questionArr.length) {  

    clearInterval(timerInterval);
    }

    var timerInterval = setInterval(function () {
  
         
    // As long as the `timeLeft` is greater than 1
       timeSecondsEl.textContent = timeSeconds;
    

    if (timeSeconds >= 1 && round +1 <= questionArr.length) {
        timeSeconds--;
        console.log(timeSeconds);
    }  
    else if (timeSeconds === 0){
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
        answerEl.className = "answer-text";
        //assigns answerEl with a specific
        answerEl.textContent = answersArr1[round][i];
        answerListEl.appendChild(answerEl);
      
    }
        console.log("round " + round);
        console.log(questionArr.length);
        
        answerListEl.addEventListener("click", chooseAnswer);
    
    
}; 

//could this be a switch case instead??

var chooseAnswer = function(event) {

      //get the current selected option's value and makes lowercase
    var statusValue = (event.target.textContent); /// look here
    console.log(statusValue);
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

    // switch (round) {
    //     //Or statement for each correct answer, paired with round
    //     case ('0' && statusValue === "Hypertext Markup Language"):
    //     //case '1' && (statusValue === "a tag that defines a division or section in an HTML document"):
    //     //case '2' &&  (statusValue === "the i is just a variable, it could be anything, but it typically means acts as an 'index'"):
    //     //result of case    
    //     gradeAnswerEl.textContent = "Correct!"         
    //          break;
    //     //wrong answer - default;     
    //     default:
    //     gradeAnswerEl.textContent = "Wrong!"
    // }

    //empties current content in the quiz.
    quizEl.textContent = "";
  
    if (round + 1 < questionArr.length && timeSeconds >= 1) {  
             //add to round
            round++;
            askQuestion(round);
    } else {
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
    
    footerEl.appendChild(backToMainButtonEl);
    highScoreEl.appendChild(highScoreDivEl);
    highScoreDivEl.appendChild(highScoreH3El);
    highScoreDivEl.appendChild(initialFormEl);
    initialFormEl.appendChild(initialsInputEl);
    highScoreDivEl.appendChild(submitInitialsButtonEl);
    
    backToMainButtonEl.addEventListener("click", backToMain);

    //submit and show high scores
    submitInitialsButtonEl.addEventListener("click", function(event){

        event.preventDefault();
    //player object
    var player = {
        initials: initialsInputEl.value,
        score: timeSeconds
    };

      // set new submission to local storage 
    localStorage.setItem("player", JSON.stringify(player));
   
    //push to players array
    
    console.log("players array after push " + players);

  // clears the form 
   document.getElementById("initials-input").value="";

   //Clear area
    highScoreH3El.textContent = "";

    
    //gets items saved as strings
    players = localStorage.getItem("player");
    //
    var savedScoresArray = [];
    //
    savedScoresArray.push(player);
    console.log(players);
    console.log(savedScoresArray);

    //checks if there's any data saved. if there's no data saved in tasks, it'll return false
    // if (!players) { //could also write (!tasks)
    //   players = [];
    //   return false;
    // }

    //shows the high score - enter the 
    var showHighScore = function(item) {
    var createPEl = document.createElement("p");
    createPEl.textElement = JSON.stringify(item);
    highScoreDivEl.appendChild(createPEl);
}
    //convert tasks fromt he string format back into an array of objects
    //var savedScoresArray = JSON.parse(savedScoresArray);
  
    var scoreListEl = document.createElement("ul");
    highScoreDivEl.appendChild(scoreListEl);
    //new code
    for (var i=0; i < players.length; i++) {
      //pass each task object into the 'createTaskEl' function
      var scoreEl = document.createElement("li");
      scoreEl.textContent = savedScoresArray[i];
        scoreListEl.appendChild(scoreEl);
    }

    });
}



var backToMain = function() {
    //revert time message
    //timeMessageEl.textContent = "Time left: ";
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


