document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("project_search");
    const projectCards = document.querySelectorAll(".project_card");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase();
            projectCards.forEach(card => {
                const textContent = card.innerText.toLowerCase();
                card.style.display = textContent.includes(term) ? "flex" : "none";
            });
        });
    }

    const certSearchInput = document.getElementById("cert_search");
    const certCards = document.querySelectorAll(".cert_card");

    if (certSearchInput) {
        certSearchInput.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase();
            certCards.forEach(card => {
                const textContent = card.innerText.toLowerCase();
                card.style.display = textContent.includes(term) ? "flex" : "none";
            });
        });
    }
});
