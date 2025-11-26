/*Carousel*/
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.carousel-dots');
  const prevButton = document.querySelector('#prev');
  const nextButton = document.querySelector('#next');
  let currentSlide = 0;
  const slideInterval = 5000;
  let slideTimer;

  // Create dots
  slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
  });

  function updateDots() {
      document.querySelectorAll('.dot').forEach((dot, index) => {
          dot.classList.toggle('active', index === currentSlide);
      });
  }

  function goToSlide(index) {
      currentSlide = index;
      if (currentSlide >= slides.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slides.length - 1;
      
      document.querySelector('.carousel-inner').style.transform = 
          `translateX(-${currentSlide * 100}%)`;
      updateDots();
      resetTimer();
  }

  function nextSlide() {
      goToSlide(currentSlide + 1);
  }

  function prevSlide() {
      goToSlide(currentSlide - 1);
  }

  function resetTimer() {
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, slideInterval);
  }

  // Event listeners
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  // Touch events
  let touchStartX = 0;
  const carousel = document.querySelector('.carousel');

  carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
          if (diff > 0) {
              nextSlide();
          } else {
              prevSlide();
          }
      }
  });

  // Start automatic slideshow
  resetTimer();

  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(slideTimer));
  carousel.addEventListener('mouseleave', resetTimer);
});





/*Page de Paiement*/
function nextStep(step) {
    // Mise à jour des étapes
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById('step' + step).classList.add('active');

    // Mise à jour de la navigation
    document.querySelectorAll('.progress-step').forEach(stepEl => {
        stepEl.classList.remove('active');
        if (parseInt(stepEl.dataset.step) < step) {
            stepEl.classList.add('completed');
        }
        if (parseInt(stepEl.dataset.step) === step) {
            stepEl.classList.add('active');
        }
    });
}

function processPayment() {
    // Afficher l'écran de chargement
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.display = 'flex';

    // Simulation du traitement du paiement
    setTimeout(() => {
        loadingOverlay.style.display = 'none';
        document.querySelector('.container').style.display = 'none';
        document.querySelector('.success-page').style.display = 'block';
    }, 2000);
}
