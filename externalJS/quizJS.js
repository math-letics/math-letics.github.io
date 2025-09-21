// external javascript for online quiz generators

// global variables
var problem;
var problemNum;
var answer;

var temp1;
var temp2;
var temp3;
var temp4;

var initialArray = []; // an array to hold the problems before they're shuffled
var finalArray = []; // an array to hold the problems after they've been shuffled

var textBox = true; // Boolean; 'true' will show text boxes; 'false' will hide text boxes
var viewAnswers = false; // Boolean; 'true' will show answers; 'false' will hide answers


// functions

// add a problem to an array after it has been created
function addToArray(problem) {
    problem += '&nbsp;&nbsp;&nbsp;<input type="text" class="textClass" size="5" />';
    problem += '&nbsp;&nbsp;<span class="answer">' + answer + '</span>';
    initialArray[problemNum-1] = problem;
    problemNum++;
} // end of addToArray(problem)

// display the problems from the array
function displayProblems() {
    for (i=1; i<problemNum; i++) {
        document.getElementById('problemSpace').innerHTML += i + ')&nbsp;&nbsp;&nbsp;&nbsp;' + finalArray[i-1] + '<br /><br />';
    }
} // end of displayProblems()

// hide the answers
function hideAnswers() {
    temp1 = document.getElementsByClassName('answer');
    for (i=0; i<temp1.length; i++) {
        temp1[i].style.display = 'none';
    }
    
    // hide the hide answers button
    document.getElementById('hideAnswersBtn').style.display = 'none';
    document.getElementById('showAnswersBtn').style.display = 'inline';
} // end of hideAnswers()

// hide the textboxes and answers; allows for nice copy and paste
function hideTextBoxes() {
    textBox = false;
    
    temp1 = document.getElementsByClassName('textClass');
    for (i=0; i<temp1.length; i++) {
        temp1[i].style.display = 'none';
    }
    
    // hide the hideTextBoxes button
    document.getElementById('hideTextBoxesBtn').style.display = 'none';
    
    // show the showTextBoxes button
    document.getElementById('showTextBoxesBtn').style.display = 'inline';
} // end of hideTextBoxes()

// display the answers when user clicks on "Show answers" button
function showAnswers() {
    temp1 = document.getElementsByClassName('answer');
    for (i=0; i<temp1.length; i++) {
        temp1[i].style.display = 'inline';
    }
    
    // show the appropriate button
    document.getElementById('showAnswersBtn').style.display = 'none';
    document.getElementById('hideAnswersBtn').style.display = 'inline';
} // end of showAnswers()

// show the textboxes
function showTextBoxes() {
    textBox = true;
    
    temp1 = document.getElementsByClassName('textClass');
    for (i=0; i<temp1.length; i++) {
        temp1[i].style.display = 'inline';
    }
    
    // hide this button
    document.getElementById('showTextBoxesBtn').style.display = 'none';
    
    // show the button to hide the text boxes
    document.getElementById('hideTextBoxesBtn').style.display = 'inline';
} // end of showTextBoxes()

// shuffle the problems from the initial array into the final array
function shuffleProblems() {
    temp1 = problemNum-2;
    for (i=temp1; i>=0; i--) {
        temp2 = problemNum - i - 2;
        temp3 = getNumber(0, i);
        finalArray[temp2] = initialArray[temp3];
        
        // reassign problems in initial array so that what was picked won't be picked again
        initialArray[temp3] = initialArray[i];       
    }
} // end of shuffleProblems()

