/* Statistics
This file will keep track of and display statistics for flashcard pages

Functions in this file:
	countCorrect(submissions) - count the answer as correct
	countWrong(submissions) - count the answer as wrong
		*parameter submissions - how many attempts on the given problem
			--> This parameter should be incremented on the HTML page
	displayStats() - calculate and display statistics

HTML file needs the following id elements:
	numCorrect
	numAttempts
	pctCorrect
**/

// global variables
var numCorrect = 0;
var numAttempts = 0;
var pctCorrect; 


function countCorrect(submissions) {
	if (submissions === 1) {
		numCorrect++;
		numAttempts++;
		displayStats();		
	}
} // end of countCorrect(submissions)

function countWrong(submissions) {
	if (submissions === 1) {
		numAttempts++;
		displayStats();
	}
} // end of countWrong(submissions)

function displayStats() {
	// first calculate percent correct
	pctCorrect = numCorrect/numAttempts*100;
	pctCorrect = pctCorrect.toFixed(0);

	// display
	document.getElementById('numCorrect').innerHTML = 'Number correct: ' + numCorrect;
	document.getElementById('numAttempts').innerHTML = 'Number attempted: ' + numAttempts; 
	document.getElementById('pctCorrect').innerHTML = 'Percent: ' + pctCorrect + '%';
}