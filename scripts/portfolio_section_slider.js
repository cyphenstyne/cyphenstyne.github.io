document.addEventListener("DOMContentLoaded", () => {
    // Portfolio slider constants
    const portPrevBtn = document.getElementById("port_prev_btn");
    const portNextBtn = document.getElementById("port_next_btn");
    const portSlider = document.getElementById("portfolio_slider");
    const portTitle = document.getElementById("portfolio_title");
    const searchInput = document.getElementById("project_search");
    const projectCards = document.querySelectorAll(".project_card");

    // Requisite state variables
    const sections = ["Projects", "Certifications", "Tech Stack", "Research Paper"];
    let currentIndex = 0;
    const maxIndex = sections.length - 1;

    // Updates the DOM to reflect the current slider index
    const updatePortfolioView = () => {
        // Calculate and apply the translation percentage. 
        // 4 slides = each slide is offset by 25% relative to the total width.
        const offset = -(currentIndex * 25);
        portSlider.style.transform = `translateX(${offset}%)`;
        
        portTitle.textContent = sections[currentIndex];

        // Toggle arrow visibility based on bounds
        portPrevBtn.style.visibility = currentIndex === 0 ? "hidden" : "visible";
        portNextBtn.style.visibility = currentIndex === maxIndex ? "hidden" : "visible";
    };

    if (portPrevBtn && portNextBtn && portSlider) {
        portNextBtn.addEventListener("click", () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updatePortfolioView();
            }
        });

        portPrevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updatePortfolioView();
            }
        });
    }

    // Filters project cards based on textual input matching the title or description
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase();
            projectCards.forEach(card => {
                const textContent = card.innerText.toLowerCase();
                card.style.display = textContent.includes(term) ? "flex" : "none";
            });
        });
    }
});