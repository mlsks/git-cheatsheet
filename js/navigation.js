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

    this.init();
  }

  init() {
    window.addEventListener("scroll", () => {
      this.handleScroll();
      this.updateNavigationIndicators();
    });

    document.addEventListener("keydown", (e) => this.handleKeyNavigation(e));

    // Initial update
    this.updateNavigationIndicators();
  }

  handleScroll() {
    if (window.pageYOffset > 300) {
      this.backToTopButton.classList.add("visible");
    } else {
      this.backToTopButton.classList.remove("visible");
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  updateNavigationIndicators() {
    const sections = Array.from(document.querySelectorAll("h2"));
    const currentPosition = window.scrollY + window.innerHeight / 3;

    let currentSectionIndex =
      sections.findIndex((section) => section.offsetTop > currentPosition) - 1;

    if (currentSectionIndex === -2) {
      currentSectionIndex = sections.length - 1;
    }

    this.updatePrevIndicator(currentSectionIndex, sections);
    this.updateNextIndicator(currentSectionIndex, sections);

    // Hide indicators after 2 seconds of no scrolling
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.prevIndicator.classList.remove("visible");
      this.nextIndicator.classList.remove("visible");
    }, 2000);
  }

  updatePrevIndicator(currentSectionIndex, sections) {
    if (currentSectionIndex > 0) {
      const prevSection = sections[currentSectionIndex - 1];
      this.prevIndicator.querySelector(".section-name").textContent =
        prevSection.textContent;
      this.prevIndicator.classList.add("visible");
    } else {
      this.prevIndicator.classList.remove("visible");
    }
  }

  updateNextIndicator(currentSectionIndex, sections) {
    if (currentSectionIndex < sections.length - 1) {
      const nextSection = sections[currentSectionIndex + 1];
      this.nextIndicator.querySelector(".section-name").textContent =
        nextSection.textContent;
      this.nextIndicator.classList.add("visible");
    } else {
      this.nextIndicator.classList.remove("visible");
    }
  }

  handleKeyNavigation(e) {
    const sections = Array.from(document.querySelectorAll("h2"));
    const currentPosition = window.scrollY + window.innerHeight / 3;

    let currentSectionIndex =
      sections.findIndex((section) => section.offsetTop > currentPosition) - 1;

    if (currentSectionIndex === -2) {
      currentSectionIndex = sections.length - 1;
    }

    if (e.key === "PageUp") {
      e.preventDefault();
      const targetSection = sections[Math.max(0, currentSectionIndex - 1)];
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        this.updateNavigationIndicators();
      }
    }

    if (e.key === "PageDown") {
      e.preventDefault();
      const targetSection =
        sections[Math.min(sections.length - 1, currentSectionIndex + 1)];
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        this.updateNavigationIndicators();
      }
    }
  }
}

class Footer {
  constructor() {
    this.createFooter();
  }

  createFooter() {
    const footer = document.createElement("footer");
    footer.style.textAlign = "center";
    footer.style.padding = "20px";
    footer.style.marginTop = "40px";
    footer.innerHTML = "©2025  Michel Sakkas";
    document.body.appendChild(footer);
  }
}

// Initialize navigation and footer
document.addEventListener("DOMContentLoaded", () => {
  new Navigation();
  new Footer();
});
