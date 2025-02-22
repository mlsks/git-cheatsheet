// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Search functionality
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const searchToggle = document.getElementById('searchToggle');
const searchWrapper = document.querySelector('.search-wrapper');
const commandSections = document.querySelectorAll('.command-section');

// Toggle search expansion
searchToggle.addEventListener('click', () => {
  searchWrapper.classList.toggle('expanded');
  if (searchWrapper.classList.contains('expanded')) {
    setTimeout(() => searchInput.focus(), 300);
  }
});

// Close search when clicking outside
document.addEventListener('click', (e) => {
  if (!searchWrapper.contains(e.target) && 
      !searchToggle.contains(e.target) && 
      searchWrapper.classList.contains('expanded')) {
    searchWrapper.classList.remove('expanded');
  }
});

// Close search on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchWrapper.classList.contains('expanded')) {
    searchWrapper.classList.remove('expanded');
  }
});

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  
  commandSections.forEach(section => {
    const commands = section.querySelectorAll('.command');
    let hasMatch = false;
    
    commands.forEach(command => {
      const commandText = command.textContent.toLowerCase();
      const description = command.nextElementSibling;
      
      if (commandText.includes(searchTerm)) {
        command.style.display = 'block';
        description.style.display = 'block';
        hasMatch = true;
      } else {
        command.style.display = 'none';
        description.style.display = 'none';
      }
    });
    
    section.style.display = hasMatch ? 'block' : 'none';
    const sectionTitle = section.querySelector('h2');
    if (sectionTitle) {
      sectionTitle.style.display = hasMatch ? 'block' : 'none';
    }
  });
}

// Debounce the search with a 300ms delay
const debouncedSearch = debounce(performSearch, 300);
searchInput.addEventListener('input', debouncedSearch);

clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  commandSections.forEach(section => {
    section.style.display = 'block';
    const elements = section.querySelectorAll('.command, .description, h2');
    elements.forEach(el => el.style.display = 'block');
  });
  searchInput.focus();
});

// Theme toggle functionality
function toggleTheme() {
  const html = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  
  if (html.getAttribute('data-theme') === 'dark') {
    html.setAttribute('data-theme', 'light');
    button.innerHTML = '🌙';
  } else {
    html.setAttribute('data-theme', 'dark');
    button.innerHTML = '☀️';
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
  
  let currentSectionIndex = sections.findIndex(section => 
    section.offsetTop > currentPosition
  ) - 1;
  
  if (currentSectionIndex === -2) {
    currentSectionIndex = sections.length - 1;
  }

  if (currentSectionIndex > 0) {
    const prevSection = sections[currentSectionIndex - 1];
    prevIndicator.querySelector('.section-name').textContent = prevSection.textContent;
    prevIndicator.classList.add('visible');
  } else {
    prevIndicator.classList.remove('visible');
  }

  if (currentSectionIndex < sections.length - 1) {
    const nextSection = sections[currentSectionIndex + 1];
    nextIndicator.querySelector('.section-name').textContent = nextSection.textContent;
    nextIndicator.classList.add('visible');
  } else {
    nextIndicator.classList.remove('visible');
  }

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    prevIndicator.classList.remove('visible');
    nextIndicator.classList.remove('visible');
  }, 2000);
}

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
      updateNavigationIndicators();
    }
  }
  
  if (e.key === 'PageDown') {
    e.preventDefault();
    const targetSection = sections[Math.min(sections.length - 1, currentSectionIndex + 1)];
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      updateNavigationIndicators();
    }
  }
});

// Initial update
updateNavigationIndicators();