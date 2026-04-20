const canvas = document.getElementById("matrix-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;
const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>[]{}|\\/-=+*^~";
const CHARS_LENGTH = CHARS.length;

if (!canvas || !ctx) {
  window.playMatrixAnimation = (_color, onComplete) => {
    if (typeof onComplete === "function") {
      onComplete();
    }
  };
} else {
  const colorProfiles = {
    blue: { head: "#ffffff", trail: "rgba(0,255,65,0.82)" },
    red: { head: "#ffffff", trail: "rgba(0,255,65,0.82)" }
  };

  let cols = 0;
  let drops = null;
  let xs = null;
  let ys = null;
  let canvasW = 0;
  let canvasH = 0;
  let activeProfile = colorProfiles.red;
  let animId = 0;
  let startTime = 0;
  let matrixRunning = false;
  let runId = 0;

  function resizeCanvas() {
    canvas.width = canvasW = window.innerWidth;
    canvas.height = canvasH = window.innerHeight;
    cols = Math.floor(canvasW / 15);

    drops = new Int16Array(cols).fill(1);
    xs = new Int16Array(cols);
    ys = new Int16Array(cols);

    for (let i = 0; i < cols; i++) {
      xs[i] = i * 15;
    }

    ctx.font = "14px monospace";
  }

  function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0,0.055)";
    ctx.fillRect(0, 0, canvasW, canvasH);

    for (let i = 0; i < cols; i++) {
      ys[i] = drops[i] * 15;
    }

    ctx.fillStyle = activeProfile.trail;
    for (let i = 0; i < cols; i++) {
      ctx.fillText(CHARS[(Math.random() * CHARS_LENGTH) | 0], xs[i], ys[i] - 15);
    }

    ctx.fillStyle = activeProfile.head;
    for (let i = 0; i < cols; i++) {
      ctx.fillText(CHARS[(Math.random() * CHARS_LENGTH) | 0], xs[i], ys[i]);

      if (ys[i] > canvasH && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  function animateMatrix(currentRun, onComplete) {
    if (currentRun !== runId) {
      return;
    }

    drawMatrix();

    if (!matrixRunning || performance.now() - startTime < 2600) {
      animId = requestAnimationFrame(() => animateMatrix(currentRun, onComplete));
      return;
    }

    let op = 1;
    const fadeOut = setInterval(() => {
      if (currentRun !== runId) {
        clearInterval(fadeOut);
        return;
      }

      op -= 0.07;
      canvas.style.opacity = op < 0 ? "0" : String(op);

      if (op <= 0) {
        clearInterval(fadeOut);
        if (typeof onComplete === "function") {
          onComplete();
        }
      }
    }, 28);
  }

  function playMatrixAnimation(color, onComplete) {
    const currentRun = ++runId;

    activeProfile = colorProfiles[color] || colorProfiles.red;
    resizeCanvas();
    canvas.classList.add("active");
    canvas.style.opacity = "0";

    if (animId) {
      cancelAnimationFrame(animId);
      animId = 0;
    }

    matrixRunning = false;
    startTime = performance.now();

    let op = 0;
    const fadeIn = setInterval(() => {
      if (currentRun !== runId) {
        clearInterval(fadeIn);
        return;
      }

      op = op + 0.12 > 1 ? 1 : op + 0.12;
      canvas.style.opacity = String(op);

      if (op >= 1) {
        clearInterval(fadeIn);
        matrixRunning = true;
      }
    }, 28);

    animateMatrix(currentRun, onComplete);
  }

  window.playMatrixAnimation = playMatrixAnimation;

  window.addEventListener("resize", () => {
    if (canvas.classList.contains("active")) {
      resizeCanvas();
    }
  });
}
