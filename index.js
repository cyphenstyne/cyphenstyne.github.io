const destinations = {
  blue: "portfolio.html",
  red: "terminal.html"
};

const destinationAssets = {
  blue: ["portfolio.css", "portfolio.js"],
  red: ["terminal.css"]
};

const warmCache = new Map();

function warmResource(url) {
  if (!url) {
    return Promise.resolve();
  }

  if (warmCache.has(url)) {
    return warmCache.get(url);
  }

  const warmup = fetch(url, {
    cache: "force-cache",
    credentials: "same-origin"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Warmup failed for ${url}`);
      }
      return response.arrayBuffer();
    })
    .catch(() => null);

  warmCache.set(url, warmup);
  return warmup;
}

function warmDestination(pill) {
  const destination = destinations[pill];
  if (!destination) {
    return Promise.resolve();
  }

  const assets = destinationAssets[pill] || [];
  return Promise.all([
    warmResource(destination),
    ...assets.map((asset) => warmResource(asset))
  ]);
}

function warmAllDestinations() {
  Object.keys(destinations).forEach((pill) => {
    void warmDestination(pill);
  });
}

function handlePillSelection(pill) {
  const destination = destinations[pill] || destinations.red;
  const playAnimation = window.playMatrixAnimation;

  void warmDestination(pill);

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

  btn.addEventListener("pointerenter", () => {
    void warmDestination(pill);
  });

  btn.addEventListener("focus", () => {
    void warmDestination(pill);
  });

  btn.addEventListener(
    "touchstart",
    () => {
      void warmDestination(pill);
    },
    { passive: true }
  );

  btn.addEventListener("click", () => handlePillSelection(pill));
  btn.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handlePillSelection(pill);
    }
  });
});

warmAllDestinations();
