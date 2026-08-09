document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".cv-section");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const currentSlideNum = document.getElementById("currentSlideNum");
    
    let currentIndex = 0;
    const totalSections = sections.length;

    function updateSection(index) {
        sections.forEach((sec, i) => {
            sec.classList.toggle("active", i === index);
        });
        currentSlideNum.textContent = `0${index + 1}`;
    }

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalSections;
        updateSection(currentIndex);
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalSections) % totalSections;
        updateSection(currentIndex);
    });

    // Keyboard Arrow Support
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            currentIndex = (currentIndex + 1) % totalSections;
            updateSection(currentIndex);
        } else if (e.key === "ArrowLeft") {
            currentIndex = (currentIndex - 1 + totalSections) % totalSections;
            updateSection(currentIndex);
        }
    });
});
