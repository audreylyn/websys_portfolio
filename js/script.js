const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");

navToggle.addEventListener("click", () => {
  const isVisible = primaryNav.getAttribute("data-visible") === "true";
  primaryNav.setAttribute("data-visible", !isVisible);
  navToggle.setAttribute("aria-expanded", !isVisible);

  // Toggle the animation class
  navToggle.classList.toggle("is-active");
});


// project-slide-navigation
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.getElementsByName("slide");
    const labels = document.querySelectorAll('.project-slide-navigation label');
    const cardsContainers = document.querySelectorAll('.cards');
    let currentSlide = 0;

    // Function to update active slide
    function updateSlide(index) {
        // Update radio project-slide-navigation state
        slides[index].checked = true;

        // Update project-slide-navigation styles
        labels.forEach((label, i) => {
            if (i === index) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });

        // Update cards visibility
        cardsContainers.forEach((container, i) => {
            if (i === index) {
                container.style.display = 'flex';
                container.style.transform = 'translateX(0)';
            } else {
                container.style.display = 'none';
                container.style.transform = 'translateX(100%)';
            }
        });
    }

    // Event listener for radio project-slide-navigations
    slides.forEach((slide, index) => {
        slide.addEventListener("change", function() {
            currentSlide = index;
            updateSlide(currentSlide);
        });
    });

    // Add touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        const threshold = 50; // Minimum swipe distance

        if (Math.abs(difference) > threshold) {
            if (difference > 0 && currentSlide < slides.length - 1) {
                // Swipe left - next slide
                currentSlide++;
                updateSlide(currentSlide);
            } else if (difference < 0 && currentSlide > 0) {
                // Swipe right - previous slide
                currentSlide--;
                updateSlide(currentSlide);
            }
        }
    }

    // Initialize first slide
    updateSlide(0);
});
