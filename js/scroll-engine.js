export function initScrollEngine() {
  // Capture all elements slated for scroll animations
  const revealElements = document.querySelectorAll('.scroll-reveal, .segment-item, .project-card');

  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.05, // Lowered to 5% visibility so it triggers instantly upon clipping the viewport
    rootMargin: "0px 0px 100px 0px" // Expanded baseline tracking padding
  };

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealCallback, observerOptions);

  revealElements.forEach(element => {
    // Set up our initial transition properties
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    
    observer.observe(element);
  });

  // EMERGENCY IMMUNITY FAIL-SAFE: If a user has already triggered the light switch 
  // or scrolls, make sure everything fades in cleanly even if the observer bugs out.
  setTimeout(() => {
    revealElements.forEach(el => {
      // If after 2 seconds an item is still invisible, force layout visibility restoration
      if (window.getComputedStyle(el).opacity === "0" && !el.classList.contains('animate-in')) {
        el.classList.add('animate-in');
      }
    });
  }, 1500);
}