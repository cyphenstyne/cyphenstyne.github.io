document.addEventListener("DOMContentLoaded", () => {
    const btnIntro = document.getElementById("nav-intro");
    const btnBeyond = document.getElementById("nav-beyond");
    const slider = document.getElementById("home-slider");

    btnIntro.addEventListener("click", () => {
        // Update active underline
        btnIntro.classList.add("active");
        btnBeyond.classList.remove("active");
        
        // Slide track to original position (show intro)
        slider.style.transform = "translateX(0%)";
    });

    btnBeyond.addEventListener("click", () => {
        // Update active underline
        btnBeyond.classList.add("active");
        btnIntro.classList.remove("active");
        
        // Slide track to the left by 50% of its total width (show beyond)
        slider.style.transform = "translateX(-50%)"; 
    });
});