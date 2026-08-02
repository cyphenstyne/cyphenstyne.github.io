document.addEventListener("DOMContentLoaded", () => {
    const portPrevBtn = document.getElementById("port_prev_btn");
    const portNextBtn = document.getElementById("port_next_btn");
    const portSlider = document.getElementById("portfolio_slider");
    const portTitle = document.getElementById("portfolio_title");
    const sections = ["Projects", "Certifications", "Tech Stack", "Research Paper"];
    let currentIndex = 0;
    const maxIndex = sections.length - 1;

    const updatePortfolioView = () => {
        const offset = -(currentIndex * 25);
        portSlider.style.transform = `translateX(${offset}%)`;
        
        portTitle.textContent = sections[currentIndex];

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
});