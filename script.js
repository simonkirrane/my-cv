document.addEventListener("DOMContentLoaded", function() {
  var root = document.querySelector(".simon-cv-container");
  if (!root) return;

  var slides = root.querySelectorAll(".cv-slide");
  var totalSlides = slides.length;
  var currentIndex = 0;
  var counterEl = root.querySelector(".cv-counter");
  var progressFill = root.querySelector(".cv-progress-fill");
  var prevBtn = root.querySelector(".cv-btn-prev");
  var nextBtn = root.querySelector(".cv-btn-next");
  var hyperfocusInterval = null;
  var eraTimeouts = [];
  var emojiTimeouts = [];

  function updateCounter() {
    if (counterEl) {
      counterEl.textContent = (currentIndex + 1) + " / " + totalSlides;
    }
  }

  function updateProgress() {
    if (progressFill) {
      var pct = ((currentIndex + 1) / totalSlides) * 100;
      progressFill.style.width = pct + "%";
    }
  }

  function stopHyperfocus() {
    if (hyperfocusInterval) {
      clearInterval(hyperfocusInterval);
      hyperfocusInterval = null;
    }
  }

  function clearEraTimeouts() {
    for (var i = 0; i < eraTimeouts.length; i++) {
      clearTimeout(eraTimeouts[i]);
    }
    eraTimeouts = [];
  }

  function clearEmojiTimeouts() {
    for (var i = 0; i < emojiTimeouts.length; i++) {
      clearTimeout(emojiTimeouts[i]);
    }
    emojiTimeouts = [];
  }

  function startEras(slide) {
    var eras = slide.querySelectorAll(".era-item");
    for (var i = 0; i < eras.length; i++) {
      eras[i].classList.remove("era-visible");
      eras[i].style.opacity = "0";
      eras[i].style.transform = "scale(0.3)";
    }
    for (var j = 0; j < eras.length; j++) {
      (function(index) {
        var t = setTimeout(function() {
          eras[index].classList.add("era-visible");
        }, 600 + (index * 900));
        eraTimeouts.push(t);
      })(j);
    }
  }

  function startEmojiReveal(slide) {
    var thirdPlace = slide.querySelector(".podium-third");
    var secondPlace = slide.querySelector(".podium-second");
    var firstPlace = slide.querySelector(".podium-first");
    var burst = slide.querySelector(".celebration-burst");

    var items = [thirdPlace, secondPlace, firstPlace];
    for (var i = 0; i < items.length; i++) {
      if (items[i]) {
        items[i].classList.remove("emoji-shown");
        items[i].style.opacity = "0";
        items[i].style.transform = "scale(0)";
      }
    }
    if (burst) {
      burst.classList.remove("burst-active");
    }

    var revealOrder = [thirdPlace, secondPlace, firstPlace];
    for (var k = 0; k < revealOrder.length; k++) {
      (function(index) {
        var t = setTimeout(function() {
          if (revealOrder[index]) {
            revealOrder[index].classList.add("emoji-shown");
          }
          if (index === 2 && burst) {
            setTimeout(function() {
              burst.classList.add("burst-active");
            }, 300);
          }
        }, 800 + (index * 1000));
        emojiTimeouts.push(t);
      })(k);
    }
  }

  function startHyperfocus(slide) {
    var counter = slide.querySelector(".hyperfocus-counter");
    if (!counter) return;
    counter.classList.remove("explode");
    var count = 0;
    var speed = 1;
    hyperfocusInterval = setInterval(function() {
      count += speed;
      if (count < 10) speed = 1;
      else speed = 5;

      if (count >= 25) {
        count = 25;
        counter.textContent = count;
        counter.classList.add("explode");
        stopHyperfocus();
        return;
      }
      counter.textContent = count;
    }, 60);
  }

  function startBooks(slide) {
    var booksEl = slide.querySelector(".books-number");
    if (!booksEl) return;
    booksEl.classList.remove("books-pop");
    booksEl.style.opacity = "0";
    booksEl.style.transform = "scale(0.3)";
    setTimeout(function() {
      booksEl.classList.add("books-pop");
    }, 400);
  }

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    stopHyperfocus();
    clearEraTimeouts();
    clearEmojiTimeouts();

    slides[currentIndex].classList.remove("slide-active");
    currentIndex = index;
    slides[currentIndex].classList.add("slide-active");

    updateCounter();
    updateProgress();

    if (slides[currentIndex].classList.contains("slide-4")) {
      startEras(slides[currentIndex]);
    }

    if (slides[currentIndex].classList.contains("slide-6")) {
      startEmojiReveal(slides[currentIndex]);
    }

    if (slides[currentIndex].classList.contains("slide-13")) {
      var counter = slides[currentIndex].querySelector(".hyperfocus-counter");
      if (counter) {
        counter.textContent = "0";
        counter.classList.remove("explode");
      }
      setTimeout(function() {
        startHyperfocus(slides[currentIndex]);
      }, 400);
    }

    if (slides[currentIndex].classList.contains("slide-12")) {
      startBooks(slides[currentIndex]);
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function() {
      if (currentIndex < totalSlides - 1) {
        goToSlide(currentIndex + 1);
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function() {
      if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }
    });
  }

  updateCounter();
  updateProgress();
});
