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

class Search {
  constructor() {
    this.searchInput = document.getElementById('searchInput');
    this.clearSearch = document.getElementById('clearSearch');
    this.searchToggle = document.getElementById('searchToggle');
    this.searchWrapper = document.querySelector('.search-wrapper');
    this.commandSections = document.querySelectorAll('.command-section');
    
    // Navigation elements
    this.prevMatch = document.getElementById('prevMatch');
    this.nextMatch = document.getElementById('nextMatch');
    this.matchCounter = document.getElementById('matchCounter');
    
    // Track search matches
    this.matches = [];
    this.currentMatchIndex = -1;
    
    this.init();
  }

  init() {
    // Toggle search expansion
    this.searchToggle.addEventListener('click', () => this.toggleSearch());

    // Close search when clicking outside
    document.addEventListener('click', (e) => this.handleOutsideClick(e));

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));

    // Debounce the search with a 300ms delay
    const debouncedSearch = debounce(() => this.performSearch(), 300);
    this.searchInput.addEventListener('input', debouncedSearch);

    // Clear search results
    this.clearSearch.addEventListener('click', () => this.clearSearchResults());
    
    // Navigation buttons
    this.prevMatch.addEventListener('click', () => this.navigateToPrevMatch());
    this.nextMatch.addEventListener('click', () => this.navigateToNextMatch());
  }

  toggleSearch() {
    this.searchWrapper.classList.toggle('expanded');
    if (this.searchWrapper.classList.contains('expanded')) {
      setTimeout(() => this.searchInput.focus(), 300);
    } else {
      this.clearSearchResults();
    }
  }

  handleOutsideClick(e) {
    if (!this.searchWrapper.contains(e.target) && 
        !this.searchToggle.contains(e.target) && 
        this.searchWrapper.classList.contains('expanded')) {
      this.searchWrapper.classList.remove('expanded');
      this.clearSearchResults();
    }
  }

  handleKeyboardNavigation(e) {
    if (e.key === 'Escape' && this.searchWrapper.classList.contains('expanded')) {
      this.searchWrapper.classList.remove('expanded');
      this.clearSearchResults();
      return;
    }
    
    // Only handle keyboard navigation if search is active
    if (!this.searchWrapper.classList.contains('expanded') || this.matches.length === 0) {
      return;
    }
    
    // Handle Enter (next) and Shift+Enter (previous)
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        this.navigateToPrevMatch();
      } else {
        this.navigateToNextMatch();
      }
    }
    
    // Handle F3 (next) and Shift+F3 (previous)
    if (e.key === 'F3') {
      e.preventDefault();
      if (e.shiftKey) {
        this.navigateToPrevMatch();
      } else {
        this.navigateToNextMatch();
      }
    }
  }

  performSearch() {
    const searchTerm = this.searchInput.value.toLowerCase().trim();
    
    // Clear previous matches
    this.clearHighlights();
    this.matches = [];
    this.currentMatchIndex = -1;
    
    if (!searchTerm) {
      this.matchCounter.textContent = '0/0';
      this.matchCounter.classList.add('no-matches');
      this.showAllContent();
      return;
    }
    
    // Find and highlight matches
    let totalMatches = 0;
    this.commandSections.forEach(section => {
      const commands = section.querySelectorAll('.command');
      let hasMatch = false;
      
      commands.forEach(command => {
        const commandText = command.textContent.toLowerCase();
        const description = command.nextElementSibling;
        
        if (commandText.includes(searchTerm)) {
          // Use classList instead of style.display to avoid conflicts with inline styles
          command.classList.remove('search-hidden');
          if (description) description.classList.remove('search-hidden');
          hasMatch = true;
          
          // Highlight matches in command
          const matchesInCommand = this.highlightMatches(command, searchTerm);
          totalMatches += matchesInCommand;
        } else {
          // Use classList instead of style.display
          command.classList.add('search-hidden');
          if (description) description.classList.add('search-hidden');
        }
      });
      
      // Use classList for sections too
      section.classList.toggle('search-hidden', !hasMatch);
      const sectionTitle = section.querySelector('h2');
      if (sectionTitle) {
        sectionTitle.classList.toggle('search-hidden', !hasMatch);
      }
    });
    
    // Update match counter
    this.updateMatchCounter();
    
    // Navigate to first match if there are any
    if (this.matches.length > 0) {
      this.navigateToMatch(0);
    }
  }
  
  highlightMatches(element, searchTerm) {
    const text = element.textContent;
    const lowerText = text.toLowerCase();
    let startIndex = 0;
    let index;
    let matchCount = 0;
    
    // Clear existing content
    const originalHTML = element.innerHTML;
    element.innerHTML = '';
    
    // Find all occurrences of the search term
    while ((index = lowerText.indexOf(searchTerm, startIndex)) > -1) {
      // Add text before the match
      if (index > startIndex) {
        element.appendChild(document.createTextNode(text.substring(startIndex, index)));
      }
      
      // Create highlighted span for the match
      const matchSpan = document.createElement('span');
      matchSpan.className = 'search-match';
      matchSpan.textContent = text.substring(index, index + searchTerm.length);
      element.appendChild(matchSpan);
      
      // Add this match to our matches array
      this.matches.push(matchSpan);
      matchCount++;
      
      // Move to the end of the match
      startIndex = index + searchTerm.length;
    }
    
    // Add remaining text after the last match
    if (startIndex < text.length) {
      element.appendChild(document.createTextNode(text.substring(startIndex)));
    }
    
    // If no matches were found, restore original HTML
    if (matchCount === 0) {
      element.innerHTML = originalHTML;
    }
    
    return matchCount;
  }
  
  clearHighlights() {
    // Remove all highlighted spans
    document.querySelectorAll('.search-match').forEach(match => {
      const parent = match.parentNode;
      if (parent) {
        // Replace the highlight span with its text content
        parent.replaceChild(document.createTextNode(match.textContent), match);
        // Normalize to merge adjacent text nodes
        parent.normalize();
      }
    });
    
    // Remove active match class
    document.querySelectorAll('.search-match-active').forEach(match => {
      match.classList.remove('search-match-active');
    });
  }
  
  navigateToNextMatch() {
    if (this.matches.length === 0) return;
    
    let newIndex = this.currentMatchIndex + 1;
    if (newIndex >= this.matches.length) {
      newIndex = 0; // Wrap around to the first match
    }
    
    this.navigateToMatch(newIndex);
  }
  
  navigateToPrevMatch() {
    if (this.matches.length === 0) return;
    
    let newIndex = this.currentMatchIndex - 1;
    if (newIndex < 0) {
      newIndex = this.matches.length - 1; // Wrap around to the last match
    }
    
    this.navigateToMatch(newIndex);
  }
  
  navigateToMatch(index) {
    // Remove active class from current match
    if (this.currentMatchIndex >= 0 && this.currentMatchIndex < this.matches.length) {
      this.matches[this.currentMatchIndex].classList.remove('search-match-active');
    }
    
    // Set new current match
    this.currentMatchIndex = index;
    
    // Add active class to new current match
    const currentMatch = this.matches[this.currentMatchIndex];
    currentMatch.classList.add('search-match-active');
    
    // Scroll to the match
    currentMatch.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    
    // Update match counter
    this.updateMatchCounter();
  }
  
  updateMatchCounter() {
    if (this.matches.length === 0) {
      this.matchCounter.textContent = '0/0';
      this.matchCounter.classList.add('no-matches');
    } else {
      this.matchCounter.textContent = `${this.currentMatchIndex + 1}/${this.matches.length}`;
      this.matchCounter.classList.remove('no-matches');
    }
  }

  showAllContent() {
    this.commandSections.forEach(section => {
      section.classList.remove('search-hidden');
      const elements = section.querySelectorAll('.command, .description, h2');
      elements.forEach(el => el.classList.remove('search-hidden'));
    });
  }

  clearSearchResults() {
    this.searchInput.value = '';
    this.clearHighlights();
    this.matches = [];
    this.currentMatchIndex = -1;
    this.matchCounter.textContent = '0/0';
    this.matchCounter.classList.add('no-matches');
    this.showAllContent();
    this.searchInput.focus();
  }
}