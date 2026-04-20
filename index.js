const bubbleText = document.querySelector(".bubble-text");
const defaultBubbleMessage = bubbleText
  ? bubbleText.innerHTML
  : "choose your pill,<br>choose your reality.";

const bubbleMessages = {
  blue: "see the simple Portfolio website, stay in the matrix",
  red: "terminal style navigation, get out of the matrix "
};

const destinations = {
  blue: "portfolio.html",
  red: "terminal.html"
};

function showBubbleMessage(pill) {
  if (!bubbleText) {
    return;
  }

  bubbleText.textContent = bubbleMessages[pill] || defaultBubbleMessage;
}

function resetBubbleMessage() {
  if (!bubbleText) {
    return;
  }

  bubbleText.innerHTML = defaultBubbleMessage;
}

function handlePillSelection(pill) {
  const destination = destinations[pill] || destinations.red;
  const playAnimation = window.playMatrixAnimation;

  if (typeof playAnimation === "function") {
    playAnimation(pill, () => {
      window.location.href = destination;
    });
    return;
  }

  window.location.href = destination;
}

document.querySelectorAll(".pill-btn").forEach((btn) => {
  const pill = btn.dataset.pill;

  btn.addEventListener("mouseenter", () => showBubbleMessage(pill));
  btn.addEventListener("mouseleave", resetBubbleMessage);
  btn.addEventListener("focus", () => showBubbleMessage(pill));
  btn.addEventListener("blur", resetBubbleMessage);

  btn.addEventListener("click", () => handlePillSelection(pill));
  btn.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handlePillSelection(pill);
    }
  });
});
