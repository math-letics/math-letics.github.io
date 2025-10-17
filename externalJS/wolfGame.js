// --- GLOBAL VARIABLES ---
let numberAttempted = 0;
let numberCorrect = 0;
let percentCorrect = 0;
let numCorrect = 0;
let level = 1;
let firstAttempt = true;

// --- INITIALIZE GAME ---
function initWolfGame() {
    getStats();
} // end of initWolfGame()

// --- STATS TRACKER ---
function getStats(){
    if(numberAttempted === 0) {
        percentCorrect = '';
    } else {
        percentCorrect = roundDecimalNumber(100 * numberCorrect / numberAttempted, 1);
    }

    let statsText = 'Level: ' + level + '<br />';
    statsText += 'Problems attempted: ' + numberAttempted + '<br />';
    statsText += 'Correct answers: ' + numberCorrect + '<br />';
    if (numberAttempted > 0) {
        statsText += 'Percent correct: ' + percentCorrect + '%';
    }

    document.getElementById('statsDiv').innerHTML = statsText;
} // end of getStats()

// --- CHECK ANSWER (works for any number of inputs) ---
function checkAnswer(){
    const problemInputs = document.querySelectorAll('[id^="answerInput"]');
    let allFilled = true;
    let userAnswers = [];

    problemInputs.forEach(input => {
        if (input.value === '') allFilled = false;
        userAnswers.push(input.value.trim());
    });

    if (!allFilled) {
        document.getElementById('errorDiv').style.visibility = 'visible';
        problemInputs[0].focus();
        return;
    }

    document.getElementById('errorDiv').style.visibility = 'hidden';

    if (firstAttempt) {
        numberAttempted++;

        const correctAnswers = currentProblem.correctAnswers;
        const isCorrect = userAnswers.length === correctAnswers.length &&
            userAnswers.every((val, i) => val == correctAnswers[i]);

        if (isCorrect) {
            numberCorrect++;
            numCorrect++;
            jumpSafe();
        } else {
            numCorrect = 0;
            jumpFail();
        }

        getStats();
    }

    firstAttempt = false;
} // end of checkAnswer()

// --- JUMP ANIMATIONS ---
function jumpSafe(){
    const wolf = document.getElementById('wolf');
    let pos = 20; // bottom position
    let peak = 120;
    let direction = 1;
    const interval = setInterval(() => {
        pos += direction * 6;
        if (pos >= peak) direction = -1;
        if (pos <= 20 && direction === -1) {
            clearInterval(interval);
            pos = 20;
            wolf.style.bottom = pos + "px";
        } else {
            wolf.style.bottom = pos + "px";
        }
    }, 20);
} // end of jumpSafe()

function jumpFail(){
    const wolf = document.getElementById('wolf');
    let pos = 20;
    let peak = 60;
    let direction = 1;
    const interval = setInterval(() => {
        pos += direction * 3;
        if (pos >= peak) direction = -1;
        if (pos <= 20 && direction === -1) {
            clearInterval(interval);
            pos = 20;
            wolf.style.bottom = pos + "px";
        } else {
            wolf.style.bottom = pos + "px";
        }
    }, 20);
} // end of jumpFail()

// --- UTILITY ---
function roundDecimalNumber(num, places){
    return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
} // end of roundDecimalNumber()
