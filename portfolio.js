const root = document.documentElement;
const themeToggleBtn = document.querySelector(".theme-toggle");
const THEME_KEY = "portfolio-theme";

function applyTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
    if (themeToggleBtn) {
      themeToggleBtn.textContent = "Light Mode";
      themeToggleBtn.setAttribute("aria-label", "Switch to light mode");
      themeToggleBtn.setAttribute("aria-pressed", "true");
    }
    return;
  }

  root.removeAttribute("data-theme");
  if (themeToggleBtn) {
    themeToggleBtn.textContent = "Dark Mode";
    themeToggleBtn.setAttribute("aria-label", "Switch to dark mode");
    themeToggleBtn.setAttribute("aria-pressed", "false");
  }
}

function initTheme() {
  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme === "dark" || storedTheme === "light") {
    applyTheme(storedTheme);
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

initTheme();

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    const nextTheme = isDark ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });
}
