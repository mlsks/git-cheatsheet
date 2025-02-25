// Make scrollToTop function globally available
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

class Navigation {
  constructor() {
    this.backToTopButton = document.querySelector(".back-to-top");
    this.prevIndicator = document.querySelector(".nav-indicator.prev");
    this.nextIndicator = document.querySelector(".nav-indicator.next");
    this.scrollTimeout = null;
    this.isScrolling = false;
    this.tocToggle = document.querySelector('.toc-toggle');
    this.tocContainer = document.getElementById('tableOfContents');

    this.init();
  }

  init() {
    if (!this.prevIndicator || !this.nextIndicator) return;

    // Throttled scroll handler to improve performance
    let lastScrollTime = 0;
    window.addEventListener("scroll", () => {
      const now = Date.now();
      if (now - lastScrollTime > 100) { // Throttle to every 100ms
        lastScrollTime = now;
        this.handleScroll();
        if (!this.isScrolling) {
          this.updateNavigationIndicators();
        }
      }
    });

    document.addEventListener("keydown", (e) => this.handleKeyNavigation(e));

    // Add click handlers for navigation indicators
    this.prevIndicator.addEventListener("click", () => {
      this.navigateToPrevSection();
    });

    this.nextIndicator.addEventListener("click", () => {
      this.navigateToNextSection();
    });

    // Handle scroll end detection
    window.addEventListener('scrollend', () => {
      this.isScrolling = false;
      this.updateNavigationIndicators();
    });

    // Listen for clicks on sidebar navigation
    const sidebarLinks = document.querySelectorAll('.doc-nav a');
    if (sidebarLinks.length > 0) {
      sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
          // Update indicators after a short delay to allow scrolling to complete
          setTimeout(() => this.updateNavigationIndicators(), 100);
        });
      });
    }

    // Initial update
    this.updateNavigationIndicators();
  }

  getCurrentSectionIndex() {
    const sections = Array.from(document.querySelectorAll("h2"));
    // Use a better position calculation that accounts for the header height
    const headerHeight = 100; // Approximate header height
    const currentPosition = window.scrollY + headerHeight;
    
    // Find the first section that is below the current position
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top + window.scrollY > currentPosition) {
        return i - 1;
      }
    }
    
    // If we're past all sections, return the last one
    return sections.length - 1;
  }

  navigateToPrevSection() {
    const sections = Array.from(document.querySelectorAll("h2"));
    const currentSectionIndex = this.getCurrentSectionIndex();
    
    if (currentSectionIndex > 0) {
      this.isScrolling = true;
      const targetSection = sections[currentSectionIndex - 1];
      
      // Calculate position accounting for fixed header if present
      const headerHeight = 20; // Adjust based on your header height
      const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
      
      this.updateNavigationIndicators();
      this.prevIndicator.style.opacity = "1";
      setTimeout(() => {
        this.prevIndicator.style.opacity = "";
      }, 2000);
    } else if (currentSectionIndex === 0) {
      // If at first section, scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }

  navigateToNextSection() {
    const sections = Array.from(document.querySelectorAll("h2"));
    const currentSectionIndex = this.getCurrentSectionIndex();
    
    if (currentSectionIndex < sections.length - 1) {
      this.isScrolling = true;
      const targetSection = sections[currentSectionIndex + 1];
      
      // Calculate position accounting for fixed header if present
      const headerHeight = 20; // Adjust based on your header height
      const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
      
      this.updateNavigationIndicators();
      this.nextIndicator.style.opacity = "1";
      setTimeout(() => {
        this.nextIndicator.style.opacity = "";
      }, 2000);
    }
  }

  handleScroll() {
    // Show/hide back to top button
    if (window.pageYOffset > 300) {
      this.backToTopButton.classList.add("visible");
    } else {
      this.backToTopButton.classList.remove("visible");
    }
    
    // If TOC is open and we're scrolling, close it
    if (this.tocToggle && this.tocContainer && 
        this.tocToggle.getAttribute('aria-expanded') === 'true' && 
        window.pageYOffset > 100) {
      // Access the TableOfContents instance if available
      if (window.tableOfContentsInstance) {
        window.tableOfContentsInstance.toggleTOC(false);
      } else {
        // Fallback if instance not available
        this.tocToggle.setAttribute('aria-expanded', 'false');
        this.tocContainer.hidden = true;
        this.tocContainer.classList.remove('toc-visible');
      }
    }
  }

  updateNavigationIndicators() {
    const sections = Array.from(document.querySelectorAll("h2"));
    const currentSectionIndex = this.getCurrentSectionIndex();

    this.updatePrevIndicator(currentSectionIndex, sections);
    this.updateNextIndicator(currentSectionIndex, sections);

    // Show indicators when updating
    this.prevIndicator.classList.add("visible");
    this.nextIndicator.classList.add("visible");

    // Hide indicators after 2 seconds of no scrolling
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      if (!this.isScrolling) {
        this.prevIndicator.classList.remove("visible");
        this.nextIndicator.classList.remove("visible");
      }
    }, 2000);
  }

  truncateText(text, maxChars = 21) {
    if (!text) return '';
    if (text.length <= maxChars) {
      return text;
    }
    return text.substring(0, maxChars) + '...';
  }

  updatePrevIndicator(currentSectionIndex, sections) {
    if (currentSectionIndex > 0) {
      const prevSection = sections[currentSectionIndex - 1];
      const sectionNameEl = this.prevIndicator.querySelector(".section-name");
      if (sectionNameEl && prevSection) {
        sectionNameEl.textContent = this.truncateText(prevSection.textContent);
      }
      this.prevIndicator.classList.add("visible");
    } else if (currentSectionIndex === 0) {
      // If at first section, show "Top" as prev
      const sectionNameEl = this.prevIndicator.querySelector(".section-name");
      if (sectionNameEl) {
        sectionNameEl.textContent = "Top";
      }
      this.prevIndicator.classList.add("visible");
    } else {
      this.prevIndicator.classList.remove("visible");
    }
  }

  updateNextIndicator(currentSectionIndex, sections) {
    if (currentSectionIndex < sections.length - 1) {
      const nextSection = sections[currentSectionIndex + 1];
      const sectionNameEl = this.nextIndicator.querySelector(".section-name");
      if (sectionNameEl && nextSection) {
        sectionNameEl.textContent = this.truncateText(nextSection.textContent);
      }
      this.nextIndicator.classList.add("visible");
    } else {
      this.nextIndicator.classList.remove("visible");
    }
  }

  handleKeyNavigation(e) {
    // Don't intercept PageUp/PageDown if user is in an input field
    if (document.activeElement.tagName === 'INPUT' || 
        document.activeElement.tagName === 'TEXTAREA') {
      return;
    }
    
    // Don't intercept if TOC is open
    if (this.tocToggle && this.tocToggle.getAttribute('aria-expanded') === 'true') {
      return;
    }

    if (e.key === "PageUp") {
      e.preventDefault();
      this.navigateToPrevSection();
    }

    if (e.key === "PageDown") {
      e.preventDefault();
      this.navigateToNextSection();
    }
  }
}

class Footer {
  constructor() {
    this.createFooter();
  }

  createFooter() {
    // Check if footer already exists
    if (document.querySelector('footer')) return;
    
    const footer = document.createElement("footer");
    footer.style.textAlign = "center";
    footer.style.padding = "20px";
    footer.style.marginTop = "40px";
    footer.style.position = "relative"; // Ensure it doesn't interfere with fixed elements
    footer.style.zIndex = "1"; // Lower z-index than navigation
    footer.innerHTML = "©2025  Michel Sakkas";
    document.body.appendChild(footer);
  }
}

// Initialize navigation and footer
document.addEventListener("DOMContentLoaded", () => {
  new Navigation();
  new Footer();
});