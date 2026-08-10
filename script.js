document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".cv-section");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const currentSlideNum = document.getElementById("currentSlideNum");

    let currentIndex = 0;
    const totalSections = sections.length;

    function formatSlideNum(index) {
        return String(index + 1).padStart(2, "0");
    }

    function animateStat(el) {
        const target = parseFloat(el.dataset.target);
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const duration = 1400;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;

            el.textContent =
                prefix +
                (decimals > 0 ? value.toFixed(decimals) : Math.round(value)) +
                suffix;

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        }

        el.textContent = prefix + "0" + suffix;
        requestAnimationFrame(tick);
    }

    function animateHeroStats(section) {
        if (!section.classList.contains("hero-section")) return;

        section.querySelectorAll(".stat-value").forEach((el) => animateStat(el));
        section.querySelectorAll(".stat-tile").forEach((tile) => {
            tile.classList.remove("stat-tile-visible");
            void tile.offsetWidth;
            tile.classList.add("stat-tile-visible");
        });
    }

    function updateSection(index) {
        sections.forEach((sec, i) => {
            sec.classList.toggle("active", i === index);
        });
        currentSlideNum.textContent = formatSlideNum(index);

        prevBtn.classList.toggle("is-hidden", index === 0);
        nextBtn.classList.toggle("is-hidden", index === totalSections - 1);
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === totalSections - 1;

        const active = sections[index];
        if (active.classList.contains("hero-section")) {
            animateHeroStats(active);
        }
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

    animateHeroStats(sections[0]);
    updateSection(0);
});
