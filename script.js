function toggleTheme() {
  const html = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  
  if (html.getAttribute('data-theme') === 'dark') {
    html.setAttribute('data-theme', 'light');
    button.innerHTML = '🌙 Dark Mode';
  } else {
    html.setAttribute('data-theme', 'dark');
    button.innerHTML = '☀️ Light Mode';
  }
}

// Back to top functionality
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Section Navigation
const prevIndicator = document.querySelector('.nav-indicator.prev');
const nextIndicator = document.querySelector('.nav-indicator.next');
let scrollTimeout;

function updateNavigationIndicators() {
  const sections = Array.from(document.querySelectorAll('h2'));
  const currentPosition = window.scrollY + window.innerHeight / 3;
  
  // Find current section
  let currentSectionIndex = sections.findIndex(section => 
    section.offsetTop > currentPosition
  ) - 1;
  
  // If no section found after current position, we're at the last section
  if (currentSectionIndex === -2) {
    currentSectionIndex = sections.length - 1;
  }

  // Update previous section indicator
  if (currentSectionIndex > 0) {
    const prevSection = sections[currentSectionIndex - 1];
    prevIndicator.querySelector('.section-name').textContent = prevSection.textContent;
    prevIndicator.classList.add('visible');
  } else {
    prevIndicator.classList.remove('visible');
  }

  // Update next section indicator
  if (currentSectionIndex < sections.length - 1) {
    const nextSection = sections[currentSectionIndex + 1];
    nextIndicator.querySelector('.section-name').textContent = nextSection.textContent;
    nextIndicator.classList.add('visible');
  } else {
    nextIndicator.classList.remove('visible');
  }

  // Hide indicators after 2 seconds of no scrolling
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    prevIndicator.classList.remove('visible');
    nextIndicator.classList.remove('visible');
  }, 2000);
}

// Update indicators on scroll
window.addEventListener('scroll', updateNavigationIndicators);

document.addEventListener('keydown', (e) => {
  const sections = Array.from(document.querySelectorAll('h2'));
  const currentPosition = window.scrollY + window.innerHeight / 3;
  
  let currentSectionIndex = sections.findIndex(section => 
    section.offsetTop > currentPosition
  ) - 1;
  
  if (currentSectionIndex === -2) {
    currentSectionIndex = sections.length - 1;
  }

  if (e.key === 'PageUp') {
    e.preventDefault();
    const targetSection = sections[Math.max(0, currentSectionIndex - 1)];
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      // Show indicators immediately on key press
      updateNavigationIndicators();
    }
  }
  
  if (e.key === 'PageDown') {
    e.preventDefault();
    const targetSection = sections[Math.min(sections.length - 1, currentSectionIndex + 1)];
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      // Show indicators immediately on key press
      updateNavigationIndicators();
    }
  }
});

// Initial update
updateNavigationIndicators();