// ===============================
// Function: giveFeedback(a, b, c, userAnswers)
// ===============================
function giveFeedback(a, b, c, userAnswers) {
  const correctAnswers = [a, b, c];
  const isCorrect = userAnswers.every((ans, i) => Number(ans) === correctAnswers[i]);

  const feedbackElement = document.getElementById("feedback");

  if (isCorrect) {
    feedbackElement.textContent = "✅ Correct!";
    feedbackElement.style.color = "green";
    jump(true);
  } else {
    feedbackElement.textContent = "❌ Try again!";
    feedbackElement.style.color = "red";
    jump(false);
  }
} // end of giveFeedback()

// ===============================
// Function: jump(success)
// ===============================
function jump(success) {
  const wolfCanvas = document.getElementById("wolfCanvas");
  const ctx = wolfCanvas.getContext("2d");
  const baseY = 100;
  let y = baseY;
  let velocity = success ? -5 : -3;
  const gravity = 0.3;
  let frame = 0;

  ctx.clearRect(0, 0, wolfCanvas.width, wolfCanvas.height);
  wolfCanvas.width = 200;
  wolfCanvas.height = 150;

  function animate() {
    frame++;
    y += velocity;
    velocity += gravity;

    ctx.clearRect(0, 0, wolfCanvas.width, wolfCanvas.height);
    ctx.beginPath();
    ctx.arc(100, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = success ? "green" : "red";
    ctx.fill();
    ctx.closePath();

    if (y < baseY) {
      requestAnimationFrame(animate);
    } else {
      y = baseY;
      ctx.clearRect(0, 0, wolfCanvas.width, wolfCanvas.height);
      ctx.beginPath();
      ctx.arc(100, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();
    }
  } // end of animate()

  animate();
} // end of jump()
