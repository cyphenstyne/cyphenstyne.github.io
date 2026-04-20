const destinations = {
  blue: "portfolio.html",
  red: "terminal.html"
};

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

  btn.addEventListener("click", () => handlePillSelection(pill));
  btn.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handlePillSelection(pill);
    }
  });
});
