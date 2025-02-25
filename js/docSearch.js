/**
 * Documentation Search Functionality
 * Handles search functionality for the documentation page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get search elements
  const searchToggle = document.getElementById('searchToggle');
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');
  const searchWrapper = document.querySelector('.search-wrapper');
  
  // Get all documentation sections
  const docSections = document.querySelectorAll('.doc-section');
  
  // Initialize search functionality
  if (searchToggle && searchInput && clearSearch) {
    // Toggle search expansion
    searchToggle.addEventListener('click', function() {
      searchWrapper.classList.toggle('expanded');
      if (searchWrapper.classList.contains('expanded')) {
        setTimeout(() => searchInput.focus(), 300);
      }
    });
    
    // Clear search results
    clearSearch.addEventListener('click', function() {
      searchInput.value = '';
      performSearch('');
      searchInput.focus();
    });
    
    // Handle search input with debouncing
    searchInput.addEventListener('input', debounce(function() {
      const searchTerm = searchInput.value.toLowerCase();
      performSearch(searchTerm);
    }, 300));
    
    // Close search when clicking outside
    document.addEventListener('click', function(e) {
      if (!searchWrapper.contains(e.target) && 
          !searchToggle.contains(e.target) && 
          searchWrapper.classList.contains('expanded')) {
        searchWrapper.classList.remove('expanded');
      }
    });
    
    // Close search on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && searchWrapper.classList.contains('expanded')) {
        searchWrapper.classList.remove('expanded');
      }
    });
  } else {
    console.error('Search elements not found in the document');
  }
  
  /**
   * Perform search across documentation sections
   * @param {string} searchTerm - The term to search for
   */
  function performSearch(searchTerm) {
    if (!searchTerm) {
      // If search is empty, show all content
      showAllContent();
      return;
    }
    
    let hasResults = false;
    
    // Search through each section
    docSections.forEach(section => {
      // Get all headings and paragraphs in this section
      const headings = section.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const paragraphs = section.querySelectorAll('p, li, code');
      const codeBlocks = section.querySelectorAll('pre code');
      
      let sectionHasMatch = false;
      
      // Check headings
      headings.forEach(heading => {
        if (heading.textContent.toLowerCase().includes(searchTerm)) {
          heading.classList.add('search-highlight');
          sectionHasMatch = true;
        } else {
          heading.classList.remove('search-highlight');
        }
      });
      
      // Check paragraphs and list items
      paragraphs.forEach(paragraph => {
        if (paragraph.textContent.toLowerCase().includes(searchTerm)) {
          paragraph.classList.add('search-highlight');
          sectionHasMatch = true;
        } else {
          paragraph.classList.remove('search-highlight');
        }
      });
      
      // Check code blocks
      codeBlocks.forEach(code => {
        if (code.textContent.toLowerCase().includes(searchTerm)) {
          code.parentElement.classList.add('search-highlight');
          sectionHasMatch = true;
        } else {
          code.parentElement.classList.remove('search-highlight');
        }
      });
      
      // Show/hide section based on matches
      if (sectionHasMatch) {
        section.style.display = 'block';
        hasResults = true;
      } else {
        section.style.display = 'none';
      }
    });
    
    // If no results found, show a message
    if (!hasResults) {
      showNoResultsMessage();
    } else {
      hideNoResultsMessage();
    }
  }
  
  /**
   * Show all content by resetting display properties
   */
  function showAllContent() {
    docSections.forEach(section => {
      section.style.display = 'block';
      
      // Remove all highlights
      const highlights = section.querySelectorAll('.search-highlight');
      highlights.forEach(el => el.classList.remove('search-highlight'));
    });
    
    hideNoResultsMessage();
  }
  
  /**
   * Show a message when no search results are found
   */
  function showNoResultsMessage() {
    let noResultsMsg = document.getElementById('noSearchResults');
    
    if (!noResultsMsg) {
      noResultsMsg = document.createElement('div');
      noResultsMsg.id = 'noSearchResults';
      noResultsMsg.className = 'no-results-message';
      noResultsMsg.textContent = 'No results found. Try a different search term.';
      document.querySelector('.doc-content').appendChild(noResultsMsg);
    }
    
    noResultsMsg.style.display = 'block';
  }
  
  /**
   * Hide the no results message
   */
  function hideNoResultsMessage() {
    const noResultsMsg = document.getElementById('noSearchResults');
    if (noResultsMsg) {
      noResultsMsg.style.display = 'none';
    }
  }
  
  /**
   * Debounce function to limit how often a function is called
   * @param {Function} func - The function to debounce
   * @param {number} wait - The debounce delay in milliseconds
   * @return {Function} - The debounced function
   */
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
});

// Add CSS for search highlighting
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    .search-highlight {
      background-color: rgba(255, 255, 0, 0.3);
      border-radius: 2px;
    }
    .no-results-message {
      padding: 20px;
      text-align: center;
      background-color: #f8f9fa;
      border-radius: 4px;
      margin: 20px 0;
      color: #6c757d;
    }
  `;
  document.head.appendChild(style);
});