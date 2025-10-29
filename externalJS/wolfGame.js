// GLOBAL GAME VARIABLES
var firstAttempt, reset = false, numCorrect = 0, level = 1;
var numberAttempted = 0, numberCorrect = 0, percentCorrect;
var jumpInProgress = false;
var result; // 'correct' or 'incorrect'

// celebration interval id (global so we can stop it)
var celebrateID = null;

// CONSTANTS
const START_LEFT = 3;
const START_BOTTOM = 30;

// RESET POSITION
function resetPosition() {
  var animate = document.getElementById("animate");
  animate.style.left = START_LEFT + "px";
  animate.style.bottom = START_BOTTOM + "px";
  animate.style.zIndex = 4;
} // end of resetPosition()

// LOAD PAGE
function loadPage() {
  document.getElementById('newButton').focus();
  document.getElementById('answerSpan').style.display = 'none';
  document.getElementById('checkButton').style.display = 'none';
  getStats();
  resetPosition();
} // end of loadPage()

// QUADRATIC BEZIER ARC
function getArcY(progress, startY, endY, peak) {
  var t = progress;
  var oneMinusT = 1 - t;
  return (oneMinusT * oneMinusT * startY) +
         (2 * oneMinusT * t * peak) +
         (t * t * endY);
} // end of getArcY()

// GENERALIZED JUMP
function jump(distance, targetBottom, jumpHeight, fail) {
  if (jumpInProgress) return;
  stopCelebrationBounce(); // stop celebration if running
  jumpInProgress = true;

  var animate = document.getElementById("animate");
  var startLeft = parseFloat(animate.style.left) || START_LEFT;
  var startBottom = parseFloat(animate.style.bottom) || START_BOTTOM;

  var totalSteps = Math.max(1, Math.floor(Math.abs(distance)));
  var stepX = distance / totalSteps;
  var peak = Math.max(startBottom, targetBottom) + jumpHeight;
  var counter = 0;

  document.getElementById('newButton').style.visibility = 'hidden';
  animate.style.zIndex = fail ? 1 : 4;

  var id = setInterval(function () {
    counter++;
    var progress = counter / totalSteps;
    animate.style.left = (startLeft + stepX * counter) + "px";
    animate.style.bottom = getArcY(progress, startBottom, targetBottom, peak) + "px";

    if (counter >= totalSteps) {
      clearInterval(id);
      animate.style.left = (startLeft + distance) + "px";
      animate.style.bottom = targetBottom + "px";
      jumpInProgress = false;

      if (result === 'correct' && numCorrect === 3) {
        level++;
        numCorrect = 0;
        reset = true;
        document.getElementById('feedbackDiv').innerHTML =
          'Correct! You have made it to Level ' + level + '!';
        getStats();
        startCelebrationBounce();
        document.getElementById('newButton').style.visibility = 'visible';
        document.getElementById('newButton').focus();
      } else {
        giveFeedback();
      }
    }
  }, 5);
} // end of jump()

function jumpSafe() { jump(150, 30, 40, false); } // end of jumpSafe()
function jumpFail() { jump(110, 5, 30, true); } // end of jumpFail()

// GENERIC FEEDBACK (custom text can be added in problem file)
function giveFeedback() {
  if (result === 'correct') {
    document.getElementById('feedbackDiv').innerHTML = '<br />Correct!';
  } else if (result === 'incorrect') {
    document.getElementById('feedbackDiv').innerHTML = '<br />Incorrect — try again!';
  }
  document.getElementById('newButton').style.visibility = 'visible';
  document.getElementById('newButton').focus();
} // end of giveFeedback()

// CELEBRATION ANIMATION
function startCelebrationBounce() {
  if (celebrateID) return;
  var animate = document.getElementById("animate");
  var baseBottom = parseFloat(animate.style.bottom) || START_BOTTOM;
  var bounceHeight = 18;
  var frames = 24;
  var frameTime = 18;
  var t = 0;
  var direction = 1;

  celebrateID = setInterval(function () {
    var p = t / frames;
    var eased = 1 - Math.pow(1 - p, 2);
    if (direction === 1) {
      animate.style.bottom = (baseBottom + eased * bounceHeight) + "px";
    } else {
      animate.style.bottom = (baseBottom + (1 - eased) * bounceHeight) + "px";
    }
    t++;
    if (t > frames) {
      t = 0;
      direction = -direction;
    }
  }, frameTime);
} // end of startCelebrationBounce()

function stopCelebrationBounce() {
  if (celebrateID) {
    clearInterval(celebrateID);
    celebrateID = null;
    var animate = document.getElementById("animate");
    var base = parseFloat(animate.style.bottom) || START_BOTTOM;
    animate.style.bottom = base + "px";
  }
} // end of stopCelebrationBounce()

// STATS
function getStats() {
  if (numberAttempted === 0) {
    percentCorrect = '';
  } else {
    percentCorrect = roundDecimalNumber(100 * numberCorrect / numberAttempted, 1);
  }

  var statsText = 'Level: ' + level + '<br />' +
                  'Attempted: ' + numberAttempted + '<br />' +
                  'Correct: ' + numberCorrect + '<br />';
  if (numberAttempted > 0) {
    statsText += 'Percent: ' + percentCorrect + '%';
  }
  document.getElementById('statsDiv').innerHTML = statsText;
} // end of getStats()

function roundDecimalNumber(number, places) {
  number = number * Math.pow(10, places);
  number = number.toFixed(0);
  number = number / Math.pow(10, places);
  return number;
} // end of roundDecimalNumber()
