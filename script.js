document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------

  // إعداد سلايد الكتاب (المعرض الرئيسي)

  // ---------------------------

  let currentSlide = 0;

  const slides = document.querySelectorAll('.slideshow img');

  const dotsContainer = document.getElementById('slideshow-dots');

  if (slides.length > 0 && dotsContainer) {

    if (slides.length > 1) {

      slides.forEach((slide, index) => {

        const dot = document.createElement('span');

        dot.classList.add('dot');

        dot.addEventListener('click', () => showSlide(index));

        dotsContainer.appendChild(dot);

      });

    }

  }

  function showSlide(index) {

    currentSlide = index;

    slides.forEach((slide, i) => {

      slide.classList.toggle('active', i === index);

    });

    updateDots();

  }

  function updateDots() {

    const dots = document.querySelectorAll('.slideshow-dots .dot');

    dots.forEach((dot, i) => {

      dot.classList.toggle('active', i === currentSlide);

    });

  }

  function nextSlide() {

    currentSlide = (currentSlide + 1) % slides.length;

    showSlide(currentSlide);

  }

  function prevSlide() {

    currentSlide = (currentSlide - 1 + slides.length) % slides.length;

    showSlide(currentSlide);

  }

  if (slides.length > 1) {

    setInterval(nextSlide, 5000);

  }

  showSlide(currentSlide);

  // ---------------------------

  // إعداد عداد التنازلي

  // ---------------------------

  const countdownElement = document.getElementById('countdown');

  let timeLeft = 2 * 60 * 60; // ساعتين بالثواني

  const audio = new Audio('notification.mp3'); // تأكد من وجود الملف

  function updateCountdown() {

    const hours = Math.floor(timeLeft / 3600);

    const minutes = Math.floor((timeLeft % 3600) / 60);

    const seconds = timeLeft % 60;

    if (countdownElement) {

      countdownElement.textContent = `⏳ العرض ينتهي خلال: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    }

    timeLeft--;

    if (timeLeft < 0) {

      clearInterval(countdownInterval);

      if (countdownElement) {

        countdownElement.textContent = "⏳ العرض انتهى!";

      }

      audio.play().catch(error => console.error("فشل تشغيل الصوت:", error));

    }

  }

  const countdownInterval = setInterval(updateCountdown, 1000);

  updateCountdown();

  // ---------------------------

  // دعم اللمس لسلايد الكتاب (للجوال)

  // ---------------------------

  let touchStartX = 0;

  let touchEndX = 0;

  const slideshowContainer = document.querySelector('.slideshow');

  if (slideshowContainer) {

    slideshowContainer.addEventListener('touchstart', (e) => {

      touchStartX = e.changedTouches[0].screenX;

    });

    slideshowContainer.addEventListener('touchend', (e) => {

      touchEndX = e.changedTouches[0].screenX;

      handleGesture();

    });

  }

  function handleGesture() {

    if (touchEndX < touchStartX - 50) {

      nextSlide();

    } else if (touchEndX > touchStartX + 50) {

      prevSlide();

    }

  }

});