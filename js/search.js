import { debounce } from './utils.js';

export class Search {
  constructor() {
    this.searchInput = document.getElementById('searchInput');
    this.clearSearch = document.getElementById('clearSearch');
    this.searchToggle = document.getElementById('searchToggle');
    this.searchWrapper = document.querySelector('.search-wrapper');
    this.commandSections = document.querySelectorAll('.command-section');
    
    this.init();
  }

  init() {
    // Toggle search expansion
    this.searchToggle.addEventListener('click', () => this.toggleSearch());

    // Close search when clicking outside
    document.addEventListener('click', (e) => this.handleOutsideClick(e));

    // Close search on escape key
    document.addEventListener('keydown', (e) => this.handleEscapeKey(e));

    // Debounce the search with a 300ms delay
    const debouncedSearch = debounce(() => this.performSearch(), 300);
    this.searchInput.addEventListener('input', debouncedSearch);

    this.clearSearch.addEventListener('click', () => this.clearSearchResults());
  }

  toggleSearch() {
    this.searchWrapper.classList.toggle('expanded');
    if (this.searchWrapper.classList.contains('expanded')) {
      setTimeout(() => this.searchInput.focus(), 300);
    }
  }

  handleOutsideClick(e) {
    if (!this.searchWrapper.contains(e.target) && 
        !this.searchToggle.contains(e.target) && 
        this.searchWrapper.classList.contains('expanded')) {
      this.searchWrapper.classList.remove('expanded');
    }
  }

  handleEscapeKey(e) {
    if (e.key === 'Escape' && this.searchWrapper.classList.contains('expanded')) {
      this.searchWrapper.classList.remove('expanded');
    }
  }

  performSearch() {
    const searchTerm = this.searchInput.value.toLowerCase();
    
    this.commandSections.forEach(section => {
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

  clearSearchResults() {
    this.searchInput.value = '';
    this.commandSections.forEach(section => {
      section.style.display = 'block';
      const elements = section.querySelectorAll('.command, .description, h2');
      elements.forEach(el => el.style.display = 'block');
    });
    this.searchInput.focus();
  }
}