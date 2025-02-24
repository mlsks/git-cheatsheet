class LazyLoader {
  constructor() {
    this.sections = document.querySelectorAll('.command-section');
    this.observer = null;
    this.init();
  }

  init() {
    // Use Intersection Observer to load sections as they come into view
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add a class to trigger animations
          entry.target.classList.add('section-visible');
          // Stop observing after it's visible
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '100px 0px', // Load slightly before they come into view
      threshold: 0.1
    });

    // Observe all sections
    this.sections.forEach(section => {
      this.observer.observe(section);
    });
  }
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  new LazyLoader();
});