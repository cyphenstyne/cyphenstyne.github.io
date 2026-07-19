document.addEventListener("DOMContentLoaded", () => {
    const btnIntro = document.getElementById("intro_btn");
    const btnBeyond = document.getElementById("beyond_btn");
    const slider = document.getElementById("home_slider");

    btnIntro.addEventListener("click", () => {
        btnIntro.classList.add("active");
        btnBeyond.classList.remove("active");
        slider.style.transform = "translateX(0%)";
    });

    btnBeyond.addEventListener("click", () => {
        btnBeyond.classList.add("active");
        btnIntro.classList.remove("active");
        slider.style.transform = "translateX(-50%)"; 
    });
});