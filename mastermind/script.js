let settings = {};
let colors = [];
let secretCode = [];
let currentGuess = [];
let guesses = 0;
let gameOver = false;

// --------------------------------------------------
// Generate available colors
// --------------------------------------------------

function generateColors(n) {

  const base = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "brown",
    "gray",
    "cyan"
  ];

  return base.slice(0, n);

} // end of generateColors()

// --------------------------------------------------
// Start game
// --------------------------------------------------

function startGame() {

  // HARD RESET FIRST (important)
  guesses = 0;
  secretCode = [];
  currentGuess = [];
  gameOver = false;

  updateCurrentGuessDisplay();
  updateStatus();

  document.getElementById("history").innerHTML = "";
  document.getElementById("gameMessage").innerHTML = "";

  document.getElementById("guessPicker").style.pointerEvents = "auto";
  document.getElementById("guessPicker").style.opacity = "1";

  settings.numColors =
    parseInt(document.getElementById("numColors").value);

  settings.numSlots =
    parseInt(document.getElementById("numSlots").value);

  settings.allowRepeats =
    document.getElementById("allowRepeats").checked;

  settings.allowBlanks =
    document.getElementById("allowBlanks").checked;

  settings.vsCPU =
    document.getElementById("vsCPU").checked;

  settings.limitGuesses =
    document.getElementById("limitGuesses").checked;

  settings.maxGuesses =
    parseInt(document.getElementById("maxGuesses").value);

  document.getElementById("game").classList.add("hidden");
  document.getElementById("handoff").classList.add("hidden");
  document.getElementById("codeSetup").classList.add("hidden");
  
  colors = generateColors(settings.numColors);

  if (settings.allowBlanks) {
    colors.push("white");
  }

  document.getElementById("setup")
          .classList.add("hidden");

  document.getElementById("history").innerHTML = "";
  document.getElementById("gameMessage").innerHTML = "";

  document.getElementById("guessPicker").style.pointerEvents = "auto";
  document.getElementById("guessPicker").style.opacity = "1";

  if (settings.vsCPU) {

    generateSecretCode();
    beginGuessing();

  } else {

    setupCodePicker();

  }


} // end of startGame()

// --------------------------------------------------
// Generate CPU code
// --------------------------------------------------

function generateSecretCode() {

  secretCode = [];

  while (secretCode.length < settings.numSlots) {

    let choice =
      colors[Math.floor(Math.random() * colors.length)];

    if (!settings.allowRepeats &&
        secretCode.includes(choice)) {

      continue;

    }

    secretCode.push(choice);

  }

} // end of generateSecretCode()

// --------------------------------------------------
// Create color picker
// --------------------------------------------------

function createPicker(containerId, clickHandler) {

  const container =
    document.getElementById(containerId);

  container.innerHTML = "";

  colors.forEach(color => {

    const div = document.createElement("div");

    div.className = "color-btn";
    div.style.background = color;

    div.onclick = () => clickHandler(color);

    container.appendChild(div);

  });

} // end of createPicker()

// --------------------------------------------------
// Two-player code setup
// --------------------------------------------------

function setupCodePicker() {

  document.getElementById("codeSetup")
          .classList.remove("hidden");

  document.getElementById("codePreview")
          .innerHTML =
          '<div id="codePreviewRow" class="previewRow"></div>';

  createPicker(
    "codePicker",
    selectCodeColor
  );

} // end of setupCodePicker()

function selectCodeColor(color) {

  if (!settings.allowRepeats &&
      secretCode.includes(color)) {

    return;

  }

  if (secretCode.length < settings.numSlots) {

    secretCode.push(color);

    updatePreview(
      "codePreviewRow",
      secretCode
    );

  }

} // end of selectCodeColor()

function clearCode() {

  secretCode = [];

  updatePreview(
    "codePreviewRow",
    secretCode
  );

} // end of clearCode()

function confirmCode() {

  if (secretCode.length !== settings.numSlots) {

    alert("Please complete the code.");

    return;

  }

  document.getElementById("codeSetup")
          .classList.add("hidden");

  document.getElementById("handoff")
          .classList.remove("hidden");

} // end of confirmCode()

// --------------------------------------------------
// Begin guessing
// --------------------------------------------------

function beginGuessing() {

  // HARD RESET UI STATE (critical for 2-player mode)
  guesses = 0;
  currentGuess = [];
  gameOver = false;

  document.getElementById("history").innerHTML = "";
  document.getElementById("gameMessage").innerHTML = "";

  document.getElementById("guessPicker").style.pointerEvents = "auto";
  document.getElementById("guessPicker").style.opacity = "1";

  updateCurrentGuessDisplay();
  updateStatus();

  document.getElementById("handoff")
          .classList.add("hidden");

  document.getElementById("game")
          .classList.remove("hidden");

  createPicker(
    "guessPicker",
    selectGuessColor
  );

  updateCurrentGuessDisplay();
  updateStatus();

} // end of beginGuessing()

// --------------------------------------------------
// Build guess
// --------------------------------------------------

function selectGuessColor(color) {

  if (!settings.allowRepeats &&
      currentGuess.includes(color)) {

    return;

  }

  if (currentGuess.length < settings.numSlots) {

    currentGuess.push(color);

    updateCurrentGuessDisplay();

  }

} // end of selectGuessColor()

function undoGuess() {

  currentGuess.pop();

  updateCurrentGuessDisplay();

} // end of undoGuess()

function clearGuess() {

  currentGuess = [];

  updateCurrentGuessDisplay();

} // end of clearGuess()

// --------------------------------------------------
// Display rows of pegs
// --------------------------------------------------

function updatePreview(id, array) {

  const container =
    document.getElementById(id);

  container.innerHTML = "";

  for (let i = 0;
       i < settings.numSlots;
       i++) {

    const peg =
      document.createElement("div");

    peg.className = "peg";

    if (i < array.length) {

      peg.style.background =
        array[i];

    } else {

      peg.style.background =
        "white";

      peg.style.opacity =
        "0.2";

    }

    container.appendChild(peg);

  }

} // end of updatePreview()

function updateCurrentGuessDisplay() {
  if (gameOver) return;

  updatePreview(
    "currentGuessDisplay",
    currentGuess
  );

} // end of updateCurrentGuessDisplay()

// --------------------------------------------------
// Evaluate guess
// --------------------------------------------------

function evaluateGuess(guess, code) {

  let correctPositions = 0;
  let correctColors = 0;

  let codeCopy = [...code];
  let guessCopy = [...guess];

  // 1. Correct positions
  for (let i = 0; i < guessCopy.length; i++) {
    if (guessCopy[i] === codeCopy[i]) {
      correctPositions++;
      codeCopy[i] = null;
      guessCopy[i] = null;
    }
  }

  // 2. Correct colors (wrong position)
  for (let i = 0; i < guessCopy.length; i++) {
    if (guessCopy[i] !== null) {

      let index = codeCopy.indexOf(guessCopy[i]);

      if (index !== -1) {
        correctColors++;
        codeCopy[index] = null;
      }
    }
  }

  return {
    correctColors,
    correctPositions
  };
} // end of evaluateGuess(guess, code)

// --------------------------------------------------
// Submit guess
// --------------------------------------------------

function submitGuess() {
  if (gameOver) return;

  if (
    currentGuess.length !==
    settings.numSlots
  ) {

    alert("Incomplete guess.");

    return;

  }

  guesses++;

  let result =
    evaluateGuess(
      currentGuess,
      secretCode
    );

  displayGuess(
    currentGuess,
    result
  );

if (result.correctPositions === settings.numSlots) {

  gameOver = true;
  document.getElementById("guessPicker").style.pointerEvents = "none";
  document.getElementById("guessPicker").style.opacity = "0.5";

  showSecretCode();

  showMessage(
    `🎉 You cracked the code in ${guesses} guesses! 🎉`,
    "green"
  );

  return;
}

  if (
    settings.limitGuesses &&
    guesses >= settings.maxGuesses
  ) {
    gameOver = true;

    showSecretCode();

    alert(
      "Out of guesses!"
    );

    return;

  }

  currentGuess = [];

  updateCurrentGuessDisplay();
  updateStatus();

} // end of submitGuess()

// --------------------------------------------------
// Display guess history
// --------------------------------------------------

function displayGuess(
  guess,
  result
) {

  const row =
    document.createElement("div");

  row.className =
    "guessRow";

  let html =
    "<strong>Guess #" +
    guesses +
    "</strong><br>";

  guess.forEach(color => {

    html +=
      `<span class="peg"
         style="background:${color}">
       </span>`;

  });

  html +=
    `<div class="feedback">
      Correct Colors:
      ${result.correctColors}
      <br>
      Correct Positions:
      ${result.correctPositions}
    </div>`;

  row.innerHTML = html;

  row.style.opacity = "0";
  row.style.transition = "opacity 0.4s";
  setTimeout(() => {
    row.style.opacity = "1";
  }, 10);

  const history = document.getElementById("history");
  history.insertBefore(row, history.firstChild);

} // end of displayGuess()

// --------------------------------------------------
// Status display
// --------------------------------------------------

function updateStatus() {

  let text =
    "Guesses Used: " +
    guesses;

  if (
    settings.limitGuesses
  ) {

    text +=
      " / " +
      settings.maxGuesses;

  }

  document
    .getElementById("status")
    .innerHTML = text;

} // end of updateStatus()

// --------------------------------------------------
// Show secret code
// --------------------------------------------------

function showSecretCode() {

  const history =
    document.getElementById(
      "history"
    );

  const div =
    document.createElement(
      "div"
    );

  div.innerHTML =
    "<h3>Secret Code</h3>";

  secretCode.forEach(color => {

    div.innerHTML +=
      `<span class="peg"
         style="background:${color}">
       </span>`;

  });

  history.appendChild(div);

} // end of showSecretCode()

function showMessage(text, color = "darkgreen") {
  const msg = document.getElementById("gameMessage");
  msg.innerHTML = text;
  msg.style.color = color;
} // end of showMessage()