// set expression texts and inputs
function setExpressions(leftText, rightText) {
  document.getElementById('leftExpr').textContent = leftText;
  document.getElementById('rightExpr').textContent = rightText;
  document.getElementById('exprInput').value = leftText;
  document.getElementById('numInput').value = rightText;
} // end of setExpressions()

// rotate the beam around pivot point (300,160)
function rotateBeam(deg) {
  const beam = document.getElementById('beam');
  const leftConnector = document.getElementById('connectorLeft');
  const rightConnector = document.getElementById('connectorRight');
  const panLeft = document.getElementById('panLeft');
  const panRight = document.getElementById('panRight');

  const px = 300, py = 160; // pivot

  function rot(x, y) {
    const rad = deg * Math.PI / 180;
    const dx = x - px, dy = y - py;
    return [
      px + dx * Math.cos(rad) - dy * Math.sin(rad),
      py + dx * Math.sin(rad) + dy * Math.cos(rad)
    ];
  }

  function setLine(id, x1, y1, x2, y2) {
    const line = document.getElementById(id);
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
  }

  setLine('beam', ...rot(200,160), ...rot(400,160));
  setLine('connectorLeft', ...rot(200,160), ...rot(200,120));
  setLine('connectorRight', ...rot(400,160), ...rot(400,120));
  setLine('panLeft', ...rot(160,120), ...rot(240,120));
  setLine('panRight', ...rot(360,120), ...rot(440,120));

  document.getElementById('feedback').textContent = `Beam rotated ${deg}°`;
} // end of rotateBeam()

// apply the input expressions
function applyInputs() {
  const left = document.getElementById('exprInput').value.trim();
  const right = document.getElementById('numInput').value.trim();
  setExpressions(left || ' ', right || ' ');
  rotateBeam(0);
} // end of applyInputs()

// animate rotation to target degree with smooth easing
function animateTo(targetDeg, duration = 400) {
  const startTime = performance.now();
  let currentDeg = 0; 
  const feedbackText = document.getElementById('feedback').textContent;
  const m = feedbackText.match(/-?\d+/);
  if(m) currentDeg = parseFloat(m[0]);

  function easeInOut(t) {
    return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
  }

  function step(time){
    const t = Math.min(1, (time - startTime)/duration);
    const eased = easeInOut(t);
    const v = currentDeg + (targetDeg - currentDeg) * eased;
    rotateBeam(v);
    if(t < 1) requestAnimationFrame(step);
    else currentDeg = targetDeg;
  }

  requestAnimationFrame(step);
} // end of animateTo()

// event wiring
function init() {
  document.getElementById('applyBtn').addEventListener('click', applyInputs);
  document.getElementById('tiltLeftBtn').addEventListener('click', () => animateTo(-12));
  document.getElementById('tiltRightBtn').addEventListener('click', () => animateTo(12));
  document.getElementById('resetBtn').addEventListener('click', () => {
    setExpressions('3x + 2', '11');
    animateTo(0);
  });

  setExpressions('3x + 2', '11');
  rotateBeam(0);
} // end of init()

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
