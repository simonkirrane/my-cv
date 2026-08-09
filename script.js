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
        if (currentIndex < totalSections - 1) {
            currentIndex++;
            updateSection(currentIndex);
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSection(currentIndex);
        }
    });

    // Keyboard Arrow Support (Stops at final contact slide)
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            if (currentIndex < totalSections - 1) {
                currentIndex++;
                updateSection(currentIndex);
            }
        } else if (e.key === "ArrowLeft") {
            if (currentIndex > 0) {
                currentIndex--;
                updateSection(currentIndex);
            }
        }
    });
});
